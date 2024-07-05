from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid
from .models import Task

router = APIRouter()

class TaskSchema(BaseModel):
    title: str
    description: str
    completed: bool

@router.post("/tasks", response_model=TaskSchema)
async def create_task(task: TaskSchema):
    task_obj = await Task.create(
        task_id=str(uuid.uuid4()),
        user_id="test-user",  # Replace with actual user_id from auth
        title=task.title,
        description=task.description,
        completed=task.completed,
    )
    return task_obj

@router.get("/tasks/{task_id}", response_model=TaskSchema)
async def get_task(task_id: str):
    task = await Task.get_or_none(task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/tasks/{task_id}", response_model=TaskSchema)
async def update_task(task_id: str, task: TaskSchema):
    task_obj = await Task.get_or_none(task_id=task_id)
    if not task_obj:
        raise HTTPException(status_code=404, detail="Task not found")
    task_obj.title = task.title
    task_obj.description = task.description
    task_obj.completed = task.completed
    await task_obj.save()
    return task_obj

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    task = await Task.get_or_none(task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await task.delete()
    return {"message": "Task deleted"}

@router.get("/tasks", response_model=list[TaskSchema])
async def list_tasks():
    tasks = await Task.all()
    return tasks
