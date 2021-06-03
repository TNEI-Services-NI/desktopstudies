# -*- coding: utf-8 -*-

import gc
import os
import tracemalloc

import psutil

global_var = []
process = psutil.Process(os.getpid())
tracemalloc.start()
s = None


def _get_foo():
    global global_var
    global_var.append([1, "a", 3, True] * 10000)  # This is our (amplified) memory leak
    return {'foo': True}


def requests(app):
    @app.route('/memory')
    def print_memory():
        return {'memory': process.memory_info().rss}

    @app.route("/snapshot")
    def snap():
        global s
        if not s:
            s = tracemalloc.take_snapshot()
            return "taken snapshot\n"
        else:
            lines = []
            top_stats = tracemalloc.take_snapshot().compare_to(s, 'lineno')
            for stat in top_stats[:5]:
                lines.append(str(stat))
            return "\n".join(lines)

    return app
