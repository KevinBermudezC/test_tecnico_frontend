export interface Course {
	id: number;
	title: string;
	description: string;
	image_thumbnail: string;
	image_cover: string;
	sample_video_url: string;
	category: string;
	is_freemium: boolean;
	teacher: string;
	slug: string;
	created_at: string;
	quizzes: Quiz[];
}

export interface Quiz {
	id: number;
	title: string;
	description?: string;
	questions: [];
}


export interface UseCourses {
	courses: Course[];
	isLoading: boolean;
	error: Error | null;
	refetch: () => Promise<void>;
}

