export class BlogComponent {
    postId: number = 1;
    title: string = '';
    slug: string = '';
    summary: string = '';
    content: string = ''
    imageUrl: string = '';
    publishedAt: Date | null = null;
    authorId: number = 0;
    status: 'pending' | 'approved' | 'rejected' = 'pending';
    categoryId: number = 0;
    approvedBy: number | null = null;
    approvedAt: Date | null = null;
    createdAt: Date = new Date()
    updatedAt: Date = new Date();

    description: String = "";

    constructor(init?: Partial<BlogComponent>) {
        Object.assign(this, init);
    }
}