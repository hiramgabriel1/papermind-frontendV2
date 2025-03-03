import { useState } from "react";

export default function FileUpload() {
	const [file, setFile] = useState(null);
	const [timeAgo, setTimeAgo] = useState("");

	const handleFileChange = (e) => {
		console.log(e.target.files[0]);

		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			setTimeAgo("Just now");
		}
	};

	const imagePreview = file ? URL.createObjectURL(file) : "";

	return (
		<section className="p-4">
			{!file ? (
				<div className="border-2 border-dashed border-black/30 rounded-2xl p-4 h-96 relative">
					<input
						type="file"
						accept="application/pdf"
						onChange={handleFileChange}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						title="Upload file"
					/>
					<div className="h-full w-full flex flex-col items-center justify-center text-gray-500">
						<p>Suelta tu archivo aquí o haz click para buscar</p>
					</div>
				</div>
			) : (
				<div className="bg-white rounded-lg shadow p-4">
					<div className="flex items-start gap-3 ">
						<div className="bg-gray-100 p-2 flex items-center rounded-lg size-12">
							<img src={imagePreview} className="w-full object-cover" />
						</div>
						<div>
							<h3 className="font-medium text-gray-900">{file.name}</h3>
							<p className="text-sm text-gray-500">{timeAgo}</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
