import moment from "moment";

export interface IDocument {
	directories: {
		id: number;
		titleDirectory: string;
		fileUrl: string;
		typeDocument: string;
		files: string[];
		userId: number;
		createdAt: moment.Moment;
	}[];
}
