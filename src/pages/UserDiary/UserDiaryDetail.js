import React from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

function UserDiaryDetail({ diary, onToggle }){
    const diarySpecific = [
        { name: "날짜", value: diary,createdAt },
        { name: "제목", value: diary.title },
        { name: "내용", value: diary.content },
    ];
    
}