from fastapi import APIRouter, Depends

from app.deps import get_current_user
from app.models import User
from app.schemas import AIRunResponse, AIToolType
from app.services.ai_service import AI_TITLES, run_ai_tool

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.post("/run/{tool_type}", response_model=AIRunResponse)
async def run_tool(tool_type: AIToolType, current_user: User = Depends(get_current_user)):
    text, source = await run_ai_tool(tool_type)
    return AIRunResponse(type=tool_type, title=AI_TITLES[tool_type], text=text, source=source)
