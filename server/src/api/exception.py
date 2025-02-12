import logging

from fastapi import HTTPException, status

from src.api.log import setup_logging

setup_logging()

db_error_message = lambda entity: {
    "create": f"Database error occurred while creating {entity}.",
    "fetch_name": f"Database error occurred while fetching {entity} by name.",
    "fetch_email": f"Database error occurred while fetching {entity} by email.",
    "fetch_id": f"Database error occurred while fetching {entity} by ID.",
    "update": f"Database error occurred while updating {entity}.",
    "delete": f"Database error occurred while deleting {entity}.",
    "fetch_all": f"Database error occurred while fetching all {entity}s.",
    "check_existence": f"Database error occurred while checking {entity} existence."
}

def create_db_error_exception(entity: str, operation: str, error: Exception) -> HTTPException:
    message = db_error_message(entity).get(operation, f"Unknown database error for {entity} with operations: {operation}.")
    logging.error(f"message {str(error)}:")
    return HTTPException(status_code=500, detail=f"{message}")

file_save_error = HTTPException(
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    detail='Error occurred while saving the file'
)




