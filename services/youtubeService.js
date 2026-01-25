const axios = require("axios");

class YouTubeService {
    async search(query) {
        if (!query || !query.trim()) {
            return [];
        }

        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    q: query,
                    type: "video",
                    maxResults: 6,
                    key: process.env.YOUTUBE_API_KEY,
                },
            }
        );

        return response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.medium?.url || "",
        }));
    }
}

module.exports = new YouTubeService();
