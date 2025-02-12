import logging

def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    file_handler = logging.FileHandler("basic.log")
    file_handler.setLevel(logging.ERROR)

    formatter = logging.Formatter('%(asctime)s  - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
