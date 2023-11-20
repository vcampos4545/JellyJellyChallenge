
export async function POST(req) {
    const { id } = await req.json();
    var apiLink = "https://www.jellyjelly.com/api/ti/recordings?id="+id;

    const apiResp = await fetch(apiLink);
    const data = await apiResp.json();
    const jellyTitle = data.data.transcription.title;
    const jellySummary = data.data.transcription.summary;

    return new Response(JSON.stringify({title: jellyTitle, summary: jellySummary}));
}