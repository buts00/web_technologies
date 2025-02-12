from fastapi import HTTPException, status

user_not_found_by_id = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User with such id not found'
)

user_not_found_by_username = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User with such username not found'
)
