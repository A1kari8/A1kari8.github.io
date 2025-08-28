// 技能数据配置文件
// 用于管理技能展示页面的数据

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // 相关项目ID
	certifications?: string[];
	color?: string; // 技能卡片主题色
}

export const skillsData: Skill[] = [
	{
		id: 'csharp',
		name: 'C#',
		description: '最喜欢的语言',
		icon: 'logos:c-sharp',
		category: 'backend',
		level: 'intermediate',
		experience: { years: 2, months: 8 },
		color: '#178600'
	},
	{
		id: 'java',
		name: 'Java',
		description: '广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性',
		icon: 'logos:java',
		category: 'backend',
		level: 'intermediate',
		experience: { years: 1, months: 6 },
		color: '#b07219'
	},
	{
		id: 'kotlin',
		name: 'Kotlin',
		description: '在Java虚拟机上执行的静态类型编程语言',
		icon: 'logos:kotlin-icon',
		category: 'backend',
		level: 'beginner',
		experience: { years: 1, months: 2 },
		color: '#A97BFF'
	},
	{
		id: 'javascript',
		name: 'JavaScript',
		description: '现代JavaScript开发，包括ES6+语法、异步编程、模块化开发等。',
		icon: 'logos:javascript',
		category: 'backend',
		level: 'intermediate',
		experience: { years: 3, months: 1 },
		color: '#F7DF1E'
	},
	{
		id: 'typescript',
		name: 'TypeScript',
		description: '类型安全的JavaScript超集，提升代码质量和开发效率。',
		icon: 'logos:typescript-icon',
		category: 'backend',
		level: 'intermediate',
		experience: { years: 2, months: 8 },
		color: '#3178C6'
	},
	{
		id: 'cpp',
		name: 'C++',
		description: 'C++是一种被广泛使用的计算机程序设计语言。',
		icon: 'logos:c-plusplus',
		category: 'backend',
		level: 'intermediate',
		experience: { years: 1, months: 1 },
		color: '#f34b7d'
	},
	{
		id: 'nodejs',
		name: 'Node.js',
		description: '基于Chrome V8引擎的JavaScript运行时，用于服务端开发。',
		icon: 'logos:nodejs-icon',
		category: 'backend',
		level: 'intermediate',
		experience: { years: 2, months: 9 },
		color: '#339933'
	},
	{
		id: 'python',
		name: 'Python',
		description: '通用编程语言，适用于Web开发、数据分析、机器学习等。',
		icon: 'logos:python',
		category: 'backend',
		level: 'beginner',
		experience: { years: 1, months: 10 },
		color: '#3776AB'
	},
	// Tools
	{
		id: 'git',
		name: 'Git',
		description: '分布式版本控制系统，代码管理和团队协作必备工具。',
		icon: 'logos:git-icon',
		category: 'tools',
		experience: { years: 3, months: 0 },
		color: '#F05032'
	},
	{
		id: 'vscode',
		name: 'Visual Studio Code',
		description: '轻量级但功能强大的代码编辑器，丰富的插件生态。',
		icon: 'logos:visual-studio-code',
		category: 'tools',
		experience: { years: 3, months: 1 },
		color: '#007ACC'
	},
	{
		id: 'idea',
		name: 'IntelliJ IDEA',
		description: '适用于专业开发的卓越 IDE,适用于 Java 和 Kotlin',
		icon: 'logos:intellij-idea',
		category: 'tools',
		experience: { years: 3, months: 0 },
		color: '#007ACC'
	},
	{
		id: 'rider',
		name: 'Rider',
		description: '全球最受喜爱的 .NET 和游戏开发 IDE',
		icon: 'logos:rider',
		category: 'tools',
		experience: { years: 2, months: 8 },
		color: '#007ACC'
	},
	{
		id: 'fedora',
		name: 'Fedora Linux',
		description: 'Fedora是商业化的RHEL的上游源码',
		icon: 'logos:fedora',
		category: 'tools',
		experience: { years: 0, months: 2 },
		color: '#007ACC'
	},
];

// 获取技能统计信息
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate").length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// 按分类获取技能
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// 获取高级技能
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// 计算总经验年数
export const getTotalExperience = () => {
	const totalMonths = skillsData.reduce((total, skill) => {
		return total + skill.experience.years * 12 + skill.experience.months;
	}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
