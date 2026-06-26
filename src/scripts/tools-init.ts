import init, { generate_random_phrase, obfuscate_image, restore_image } from '../../wasm/pixobfus/pixobfus.js';

let wasmInitialized = false;
let currentImageData: Uint8Array | null = null;
let currentFileName = '';

async function initWasm() {
    if (!wasmInitialized) {
        try {
            await init();
            wasmInitialized = true;
        } catch (error) {
            console.error('Failed to initialize WASM:', error);
            showStatus('WASM 初始化失败: ' + String(error), 'error');
            throw error;
        }
    }
}

function getUseGilbert(): boolean {
    const gilbertRadio = document.getElementById('curveGilbert') as HTMLInputElement;
    return gilbertRadio?.checked ?? true;
}

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            if (!targetTab) return;

            tabButtons.forEach(btn => btn.setAttribute('data-active', 'false'));
            tabContents.forEach(content => content.classList.add('hidden'));

            button.setAttribute('data-active', 'true');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

function bindEventListeners() {
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    if (generateKeyBtn) {
        generateKeyBtn.addEventListener('click', async () => {
            try {
                await initWasm();
                const phrase = generate_random_phrase();
                const keyInput = document.getElementById('keyInput') as HTMLInputElement;
                if (keyInput) keyInput.value = phrase;
            } catch (error) {
                showStatus('生成密钥失败: ' + String(error), 'error');
            }
        });
    }

    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', async (e) => {
            const input = e.target as HTMLInputElement;
            const file = input.files?.[0];
            if (!file) return;

            try {
                currentFileName = file.name;
                currentImageData = await imageToUint8Array(file);

                const img = await loadImage(file);
                const canvas = document.getElementById('originalCanvas') as HTMLCanvasElement;
                const placeholder = document.getElementById('originalPlaceholder');
                if (!canvas || !placeholder) return;

                drawImageOnCanvas(canvas, img);
                canvas.classList.remove('hidden');
                placeholder.classList.add('hidden');

                const resultCanvas = document.getElementById('resultCanvas') as HTMLCanvasElement;
                const resultPlaceholder = document.getElementById('resultPlaceholder');
                const downloadBtn = document.getElementById('downloadBtn');

                if (resultCanvas) resultCanvas.classList.add('hidden');
                if (resultPlaceholder) resultPlaceholder.classList.remove('hidden');
                if (downloadBtn) downloadBtn.classList.add('hidden');
            } catch (error) {
                showStatus('图片加载失败', 'error');
            }
        });
    }

    const obfuscateBtn = document.getElementById('obfuscateBtn') as HTMLButtonElement;
    if (obfuscateBtn) {
        obfuscateBtn.addEventListener('click', async () => {
            if (!currentImageData) { showStatus('请先选择一张图片', 'error'); return; }

            const keyInput = document.getElementById('keyInput') as HTMLInputElement;
            const key = keyInput?.value.trim();
            if (!key) { showStatus('请输入密钥', 'error'); return; }

            try {
                obfuscateBtn.disabled = true;
                const restoreBtn = document.getElementById('restoreBtn') as HTMLButtonElement;
                if (restoreBtn) restoreBtn.disabled = true;

                await initWasm();

                const useGilbert = getUseGilbert();
                const resultData = obfuscate_image(currentImageData, key, useGilbert);

                const resultCanvas = document.getElementById('resultCanvas') as HTMLCanvasElement;
                const resultPlaceholder = document.getElementById('resultPlaceholder');
                const downloadBtn = document.getElementById('downloadBtn');
                if (!resultCanvas || !resultPlaceholder || !downloadBtn) return;

                await displayResultImage(resultData, resultCanvas);

                resultCanvas.classList.remove('hidden');
                resultPlaceholder.classList.add('hidden');
                downloadBtn.classList.remove('hidden');

                (downloadBtn as any).__resultData = resultData;
                (downloadBtn as any).__fileName = currentFileName.replace(/\.[^/.]+$/, '_obfuscated.png');
            } catch (error) {
                showStatus('图片混淆失败: ' + String(error), 'error');
            } finally {
                obfuscateBtn.disabled = false;
                const restoreBtn = document.getElementById('restoreBtn') as HTMLButtonElement;
                if (restoreBtn) restoreBtn.disabled = false;
            }
        });
    }

    const restoreBtn = document.getElementById('restoreBtn') as HTMLButtonElement;
    if (restoreBtn) {
        restoreBtn.addEventListener('click', async () => {
            if (!currentImageData) { showStatus('请先选择一张图片', 'error'); return; }

            const keyInput = document.getElementById('keyInput') as HTMLInputElement;
            const key = keyInput?.value.trim();
            if (!key) { showStatus('请输入密钥', 'error'); return; }

            try {
                restoreBtn.disabled = true;
                const obfuscateBtn = document.getElementById('obfuscateBtn') as HTMLButtonElement;
                if (obfuscateBtn) obfuscateBtn.disabled = true;

                await initWasm();

                const useGilbert = getUseGilbert();
                const resultData = restore_image(currentImageData, key, useGilbert);

                const resultCanvas = document.getElementById('resultCanvas') as HTMLCanvasElement;
                const resultPlaceholder = document.getElementById('resultPlaceholder');
                const downloadBtn = document.getElementById('downloadBtn');
                if (!resultCanvas || !resultPlaceholder || !downloadBtn) return;

                await displayResultImage(resultData, resultCanvas);

                resultCanvas.classList.remove('hidden');
                resultPlaceholder.classList.add('hidden');
                downloadBtn.classList.remove('hidden');

                (downloadBtn as any).__resultData = resultData;
                (downloadBtn as any).__fileName = currentFileName.replace(/\.[^/.]+$/, '_restored.png');
            } catch (error) {
                showStatus('图片还原失败: ' + String(error), 'error');
            } finally {
                restoreBtn.disabled = false;
                const obfuscateBtn = document.getElementById('obfuscateBtn') as HTMLButtonElement;
                if (obfuscateBtn) obfuscateBtn.disabled = false;
            }
        });
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const btn = downloadBtn as any;
            const resultData = btn.__resultData;
            const fileName = btn.__fileName || 'result.png';

            if (!resultData) { showStatus('没有可下载的图片', 'error'); return; }

            const blob = new Blob([resultData], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
}

function showStatus(message: string, type: 'info' | 'success' | 'error' = 'info') {
    const statusEl = document.getElementById('statusMessage');
    if (!statusEl) return;

    statusEl.textContent = message;

    const baseClasses = 'text-sm text-center py-3 px-4 rounded-[var(--radius-large)] font-medium transition-all';
    let colorClasses = '';

    if (type === 'error') {
        colorClasses = 'bg-red-500/10 text-red-500 dark:bg-red-500/20 border-2 border-red-500/30';
    } else if (type === 'success') {
        colorClasses = 'bg-green-500/10 text-green-600 dark:text-green-400 dark:bg-green-500/20 border-2 border-green-500/30';
    } else {
        colorClasses = 'bg-[var(--primary)]/10 text-[var(--primary)] border-2 border-[var(--primary)]/30';
    }

    statusEl.className = `${baseClasses} ${colorClasses}`;
    statusEl.classList.remove('hidden');

    if (type !== 'error') {
        setTimeout(() => { statusEl.classList.add('hidden'); }, 3000);
    }
}

async function loadImage(file: File) {
    const img = new Image();
    const reader = new FileReader();
    return new Promise<HTMLImageElement>((resolve, reject) => {
        reader.onload = (e) => {
            img.onload = () => resolve(img);
            img.onerror = reject;
            if (e.target?.result) img.src = e.target.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function imageToUint8Array(file: File): Promise<Uint8Array> {
    return new Uint8Array(await file.arrayBuffer());
}

function drawImageOnCanvas(canvas: HTMLCanvasElement, img: HTMLImageElement) {
    const maxSize = 400;
    let width = img.width;
    let height = img.height;

    if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width *= ratio;
        height *= ratio;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
}

async function displayResultImage(imageData: Uint8Array, canvas: HTMLCanvasElement) {
    const blob = new Blob([imageData.slice()], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    return new Promise<void>((resolve, reject) => {
        img.onload = () => {
            drawImageOnCanvas(canvas, img);
            URL.revokeObjectURL(url);
            resolve();
        };
        img.onerror = reject;
        img.src = url;
    });
}

function initToolsPage() {
    currentImageData = null;
    currentFileName = '';

    initTabs();
    bindEventListeners();
    initWasm().catch(err => {
        console.error('Failed to initialize WASM:', err);
        showStatus('WASM 加载失败，请刷新页面重试', 'error');
    });
}

export { initToolsPage };
