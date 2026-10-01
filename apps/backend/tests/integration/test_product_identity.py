"""The public display name changes without changing the API route convention."""

import httpx
import pytest

from app.main import app


@pytest.mark.integration
async def test_product_identity_and_api_routes() -> None:
    async with httpx.AsyncClient(
        transport=httpx.ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/")
        assert response.status_code == 200
        assert response.json()["name"] == "Jugalbandi API"
        assert response.json()["docs"] == "/docs"

        specification = await client.get("/openapi.json")
        assert specification.status_code == 200
        assert specification.json()["info"]["title"] == "Jugalbandi API"
        assert "/api/v1/resumes" in specification.json()["paths"]
