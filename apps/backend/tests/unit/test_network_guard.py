"""The test runner starts while application connections remain denied."""

import asyncio
import socket

import pytest

from tests.conftest import UnexpectedNetworkAccess


async def test_event_loop_runs_with_network_guard_active() -> None:
    """Windows needs its internal socket pair before the guard is installed."""
    await asyncio.sleep(0)
    assert asyncio.get_running_loop().is_running()
    with pytest.raises(UnexpectedNetworkAccess):
        socket.create_connection(("192.0.2.1", 443))


def test_sync_connections_remain_blocked() -> None:
    with pytest.raises(UnexpectedNetworkAccess):
        socket.create_connection(("192.0.2.1", 443))


@pytest.mark.parametrize("method", ["connect", "connect_ex"])
@pytest.mark.parametrize("address", [("192.0.2.1", 443), ("127.0.0.1", 80)])
def test_direct_sockets_remain_blocked(
    method: str, address: tuple[str, int]
) -> None:
    """Do not solve runner startup by permitting arbitrary loopback traffic."""
    with socket.socket() as client:
        with pytest.raises(UnexpectedNetworkAccess):
            getattr(client, method)(address)
