<script lang="ts">
import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";
import { onMount } from "svelte";
import * as openpgp from "openpgp";
import Icon from "@iconify/svelte";

export let encryptedContent: string;
export let permissionLevel: number = 1;

let priKey = "";
let html = "";
let passphrase = "";
let errorMessage = "";
let unlocking = false;
let unlocked = false;
let passwordInput: HTMLTextAreaElement;
let passphraseInput: HTMLInputElement;

const i18nUnlocking = i18n(I18nKey.keyUnlocking);
const i18nDecryptError = i18n(I18nKey.keyDecryptError);
const i18nUnlock = i18n(I18nKey.keyUnlock);

function clearError() {
    if (errorMessage) {
        errorMessage = '';
    }
}

async function attemptUnlock() {
    if (!priKey.trim()) {
        errorMessage = '请输入私钥';
        return;
    }

    if (!priKey.includes('BEGIN PGP PRIVATE KEY BLOCK') || !priKey.includes('END PGP PRIVATE KEY BLOCK')) {
        errorMessage = '私钥格式不正确，请输入完整的 PGP 私钥';
        return;
    }

    unlocking = true;
    errorMessage = '';

    try {
        const trimmedPassphrase = passphrase.trim();
        html = await decryptMessage(
            encryptedContent,
            priKey.trim(),
            trimmedPassphrase || undefined
        );

        unlocked = true;
        console.log('解密成功');
    } catch (e: any) {
        console.error('解密失败:', e);

        if (e.message?.includes('passphrase')) {
            errorMessage = '密码短语错误，请检查后重试';
        } else if (e.message?.includes('key')) {
            errorMessage = '私钥格式错误或已损坏';
        } else {
            errorMessage = i18nDecryptError || '解密失败，请检查私钥和密码短语';
        }
    } finally {
        unlocking = false;
    }
}

export async function decryptMessage(
    encryptedText: string,
    privateKeyArmored: string,
    passphrase?: string
): Promise<string> {
    try {
        const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });

        const decryptedKey = passphrase
            ? await openpgp.decryptKey({
                privateKey,
                passphrase,
            })
            : privateKey;

        const message = await openpgp.readMessage({
            armoredMessage: encryptedText,
        });

        const { data: decrypted } = await openpgp.decrypt({
            message,
            decryptionKeys: decryptedKey,
        });

        return decrypted as string;
    } catch (error) {
        console.error('OpenPGP 解密错误:', error);
        throw error;
    }
}

function onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        attemptUnlock();
    }
}

onMount(() => {
    if (passwordInput) {
        passwordInput.focus();
    }
});
</script>

{#if !unlocked}
<div class="password-protection">
    <div class="password-container">
        <div class="lock-icon justify-center flex-row">
<!--            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" fill="currentColor"/>-->
<!--            </svg>-->
            <span class="text-2xl font-extrabold">这是一篇加密文章</span>
        </div>

        <h2>{i18n(I18nKey.requirePermissionTitle)}</h2>
        <p>{i18n(I18nKey.requirePermissionDesc)}</p>

        <!-- 权限等级提示 - 样式1：当前样式 -->
        <!-- <div class="permission-level-info">
            <div class="level-indicator">
                <div class="level-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1l8.5 5v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6L12 1z" fill="currentColor"/>
                    </svg>
                </div>
                <span class="level-text">需要等级 {permissionLevel} 权限</span>
            </div>
            <div class="level-note">请使用等级 {permissionLevel} 或更高权限的私钥解密</div>
        </div> -->

        <!-- 权限等级提示 - 样式2：横向布局 -->
         <div class="permission-level-info style2">
            <svg width="40" height="40" viewBox="0 0 24 24" class="text-[--primary]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1l8.5 5v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6L12 1z" fill="currentColor"/>
            </svg>
            <span class="level-number">{permissionLevel}</span>
            <div class="level-text-horizontal">
                <div class="level-title">权限等级 {permissionLevel}</div>
                <div class="level-desc">需要等级 {permissionLevel}+ 的私钥</div>
            </div>
        </div>

        <!-- 权限等级提示 - 样式3：卡片式 -->
<!--        <div class="permission-level-info style3">-->
<!--            <div class="level-header-card">-->
<!--                <div class="level-icon-large">-->
<!--                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" fill="currentColor"/>-->
<!--                    </svg>-->
<!--                </div>-->
<!--                <div class="level-content-card">-->
<!--                    <div class="level-title-large">权限验证</div>-->
<!--                    <div class="level-requirement">需要等级 <span class="level-highlight">{permissionLevel}</span> 或更高权限</div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

        <!-- 权限等级提示 - 样式4：极简风格 -->
<!--        <div class="permission-level-info style4">-->
<!--            <div class="level-simple">-->
<!--                🔐 等级 {permissionLevel} 权限验证-->
<!--            </div>-->
<!--        </div>-->

        <div class="input-section">
            <div class="input-group">
                <label for="private-key-input" class="input-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.65 10C11.7 7.31 8.9 5.5 5.77 6.12c-2.29.46-4.15 2.29-4.63 4.58C.32 14.57 2.92 18 6.71 18H16c3.31 0 6-2.69 6-6 0-3.09-2.34-5.64-5.35-5.99-.18-2.37-2.23-4.01-4.65-4.01z" fill="currentColor"/>
                    </svg>
                    私钥 (Private Key)
                </label>
                <textarea
                    id="private-key-input"
                    placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----&#10;...&#10;-----END PGP PRIVATE KEY BLOCK-----"
                    class="private-key-input"
                    rows="8"
                    bind:value={priKey}
                    bind:this={passwordInput}
                    on:input={clearError}
                    disabled={unlocking}
                ></textarea>
            </div>

            <div class="input-group">
                <label for="passphrase-input" class="input-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10v-4c0-3.31 2.69-6 6-6s6 2.69 6 6v4h1c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h1zm2-4c0-2.21 1.79-4 4-4s4 1.79 4 4v4H8V6z" fill="currentColor"/>
                    </svg>
                    密码短语 (Passphrase)
                    <span class="optional-text">可选</span>
                </label>
                <input
                    type="password"
                    id="passphrase-input"
                    placeholder="如果私钥有密码保护，请在此输入"
                    class="passphrase-input"
                    bind:value={passphrase}
                    bind:this={passphraseInput}
                    on:keypress={onKeyPress}
                    on:input={clearError}
                    disabled={unlocking}
                />
            </div>

            <button class="unlock-button" on:click={attemptUnlock} disabled={unlocking || !priKey.trim()}>
                {#if unlocking}
                    <svg class="loading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                    {i18nUnlocking}
                {:else}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" fill="currentColor"/>
                    </svg>
                    {i18nUnlock}
                {/if}
            </button>
        </div>

        {#if errorMessage}
            <div class="error-message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="currentColor"/>
                    <path d="M15 9l-6 6m0-6l6 6" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                {errorMessage}
            </div>
        {/if}
    </div>
</div>
{:else}
    <div class="decrypted-content">
        {@html html}
    </div>
{/if}

<style>

.level-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
}

.password-protection {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: 2rem;
}

.password-container {
    text-align: center;
    max-width: 500px;
    width: 100%;
    padding: 2.5rem;
    border-radius: var(--radius-large);
    background: var(--card-bg);
    border: 1px solid var(--line-divider);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.005);
    transition: all 0.3s ease;
    position: relative;
}

.lock-icon {
    color: var(--primary);
}

.password-container h2 {
    margin-bottom: 0.75rem;
    color: var(--deep-text);
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: -0.025em;
}

:global(.dark) .password-container h2 {
    color: var(--title-active);
}

.password-container p {
    margin-bottom: 2rem;
    color: oklch(0.45 0.05 var(--hue));
    font-size: 0.95rem;
    line-height: 1.6;
}

:global(.dark) .password-container p {
    color: oklch(0.65 0.05 var(--hue));
}

.permission-level-info {
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: var(--radius-large);
    background: var(--btn-regular-bg);
    border: 1px solid var(--line-divider);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.permission-level-info.style2 {
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.permission-level-info.style3 {
    padding: 1.5rem;
    background: var(--card-bg);
    border: 1px solid var(--line-divider);
    border-radius: var(--radius-large);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.level-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: calc(var(--radius-large) * 0.75);
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1rem;
    gap: 0.5rem;
}

.level-badge-horizontal {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-large);
    background: var(--card-bg);
    color: white;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 0.5rem;
}

.level-icon {
    width: 24px;
    height: 24px;
}

.level-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.125rem;
}

.level-desc {
    font-size: 0.875rem;
    color: var(--btn-content);
}

.level-content-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.level-header-card {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-large);
    background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.level-icon-large {
    width: 28px;
    height: 28px;
    margin-right: 0.5rem;
}

.level-requirement {
    font-size: 0.875rem;
    color: var(--btn-content);
}

.level-simple {
    font-size: 1rem;
    color: var(--deep-text);
    font-weight: 500;
}

:global(.dark) .permission-level-info {
    background: var(--card-bg);
    border-color: var(--line-divider);
}

:global(.dark) .level-indicator,
:global(.dark) .level-badge-horizontal {
    background: var(--primary);
    color: white;
}

:global(.dark) .level-title,
:global(.dark) .level-desc,
:global(.dark) .level-requirement {
    color: oklch(0.75 0.05 var(--hue));
}

:global(.dark) .level-simple {
    color: oklch(0.85 0.02 var(--hue));
}

.input-section {
    margin-bottom: 1.5rem;
    text-align: left;
}

.input-group {
    margin-bottom: 1.5rem;
}

.input-label {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    color: var(--btn-content);
    font-weight: 500;
    font-size: 0.925rem;
    gap: 0.5rem;
}

.input-label svg {
    color: var(--primary);
    opacity: 0.8;
}

.optional-text {
    margin-left: auto;
    font-size: 0.8rem;
    color: var(--btn-content);
    font-weight: 400;
    padding: 0.25rem 0.75rem;
    background: var(--btn-regular-bg);
    border-radius: calc(var(--radius-large) * 0.5);
    border: 1px solid var(--line-divider);
    opacity: 0.8;
}

.private-key-input,
.passphrase-input {
    width: 100%;
    padding: 1rem 1.25rem;
    border: 2px solid var(--line-divider);
    border-radius: var(--radius-large);
    background: var(--card-bg);
    color: var(--deep-text);
    font-size: 0.95rem;
    line-height: 1.5;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.private-key-input {
    resize: vertical;
    min-height: 200px;
    font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    letter-spacing: 0.5px;
    font-weight: 400;

    /* 滚动条样式 */
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-bg) transparent;
}

/* WebKit浏览器（Chrome、Safari、Edge）的滚动条样式 */
.private-key-input::-webkit-scrollbar {
    width: 8px;
}

.private-key-input::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
}

.private-key-input::-webkit-scrollbar-thumb {
    background: var(--scrollbar-bg);
    border-radius: 4px;
    transition: all 0.2s ease;
}

.private-key-input::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-bg-hover);
    width: 10px;
}

.private-key-input::-webkit-scrollbar-thumb:active {
    background: var(--scrollbar-bg-active);
}

.passphrase-input {
    font-family: inherit;
}

:global(.dark) .private-key-input,
:global(.dark) .passphrase-input {
    color: oklch(0.85 0.02 var(--hue));
    border-color: var(--line-divider);
    background: var(--card-bg);
}

.private-key-input::placeholder,
.passphrase-input::placeholder {
    color: oklch(0.5 0.03 var(--hue));
    font-size: 0.9rem;
    opacity: 0.7;
}

:global(.dark) .private-key-input::placeholder,
:global(.dark) .passphrase-input::placeholder {
    color: oklch(0.6 0.04 var(--hue));
}

.private-key-input:focus,
.passphrase-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px oklch(from var(--primary) l c h / 0.15);
}

.private-key-input:hover:not(:focus),
.passphrase-input:hover:not(:focus) {
    border-color: var(--primary);
    opacity: 0.8;
}

.private-key-input:disabled,
.passphrase-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--btn-regular-bg);
}

.unlock-button {
    width: 100%;
    padding: 1rem 1.5rem;
    background: var(--enter-btn-bg);
    color: var(--btn-content);
    border: none;
    border-radius: var(--radius-large);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.unlock-button:hover {
    background: var(--enter-btn-bg-hover);
}

.unlock-button:active {
    background: var(--enter-btn-bg-active);
}

.unlock-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--btn-regular-bg);
}

.loading-icon {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.error-message {
    color: oklch(0.55 0.15 15);
    font-size: 0.9rem;
    margin-top: 1.25rem;
    padding: 1rem 1.25rem;
    background: oklch(0.97 0.02 15);
    border: 1px solid oklch(0.9 0.05 15);
    border-radius: var(--radius-large);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

:global(.dark) .error-message {
    color: oklch(0.7 0.12 15);
    background: oklch(0.25 0.03 15);
    border-color: oklch(0.35 0.05 15);
}

.decrypted-content {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 响应式设计 */
@media (max-width: 640px) {
    .password-protection {
        padding: 1rem;
        min-height: 50vh;
    }

    .password-container {
        padding: 2rem 1.5rem;
        max-width: 100%;
        margin: 0 0.5rem;
    }

    .password-container h2 {
        font-size: 1.5rem;
    }

    .private-key-input {
        min-height: 160px;
        font-size: 0.875rem;
        padding: 0.875rem 1rem;
    }

    .unlock-button {
        padding: 0.875rem 1rem;
        font-size: 0.95rem;
    }

    .input-label {
        font-size: 0.875rem;
    }
}

@media (max-width: 480px) {
    .password-container {
        padding: 1.5rem 1rem;
        margin: 0;
    }

    .private-key-input {
        min-height: 140px;
        font-size: 0.8rem;
        padding: 0.75rem;
    }
}

/* 可访问性 */
.private-key-input:focus,
.passphrase-input:focus,
.unlock-button:focus {
    outline: none;
}

/* 暗色主题 */
:global(.dark) .password-container {
    border-color: var(--line-divider);
}
</style>
