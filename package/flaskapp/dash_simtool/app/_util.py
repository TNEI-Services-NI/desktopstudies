# -*- coding: utf-8 -*-
import base64
import io
import warnings
import os

import pandas as pd


def create_dataframe(contents, filename):
    """Create Pandas DataFrame from local CSV."""
    content_type, content_string = contents.split(',')
    decoded = base64.b64decode(content_string)
    if 'csv' in filename:
        # Assume that the user uploaded a CSV file
        return pd.read_csv(io.StringIO(decoded.decode('utf-8')))
    elif 'xls' in filename:
        # Assume that the user uploaded an excel file
        return pd.read_excel(io.BytesIO(decoded), sheet_name=None)
    else:
        warnings.warn("Unexpected input data type")


def save_file(name, content, directory_save):
    """Decode and store a file uploaded with Plotly Dash."""
    data = content.encode("utf8").split(b";base64,")[1]
    with open(os.path.join(directory_save, name), "wb") as fp:
        fp.write(base64.decodebytes(data))
