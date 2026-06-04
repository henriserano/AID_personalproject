import fastapi
from . import controller

router = fastapi.APIRouter(prefix="/model", tags=["Model"])
app = fastapi.FastAPI()


if __name__ == "__main__":
    print("Model routes loaded")
    app.include_router(router)
    