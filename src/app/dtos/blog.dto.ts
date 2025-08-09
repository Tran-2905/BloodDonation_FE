export class blogDTO {
    id: number;
    title: string;
    author_name: string;
    approved_at: string;
    image_url: string;
    summary: string;
    content: string;
    constructor(id: number, title: string, author: string, date: string, image: string, summary: string, content: string) {
        this.id = id;
        this.title = title;
        this.author_name = author;
        this.approved_at = date;
        this.image_url = image;
        this.summary = summary;
        this.content = content;
    }
}