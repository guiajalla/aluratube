import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://mdxmjjkyarvpkaebwdcj.supabase.co';
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keG1qamt5YXJ2cGthZWJ3ZGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjQ4NTUsImV4cCI6MTk4Mzk0MDg1NX0.xi8zJVLuqXhsbuPuc14hP09p-pqwdHmSlb8BSKrLCWs';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}