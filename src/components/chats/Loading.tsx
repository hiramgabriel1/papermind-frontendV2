import React from "react";

/**
 * Loading
 * @returns Loading
 */
function Loading() {
	return (
		<div className="flex items-center space-x-1 animate-pulse">
			<div className="w-2 h-2 bg-gray-500 rounded-full"></div>
			<div className="w-2 h-2 bg-gray-500 rounded-full"></div>
			<div className="w-2 h-2 bg-gray-500 rounded-full"></div>
		</div>
	);
}

export default Loading;
