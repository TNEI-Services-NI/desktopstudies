# -*- coding: utf-8 -*-
import requests
from pprint import pprint
import os
import multiprocessing as mp
import time


def test(api_test_call, pool):
    print("Starting pool {}...".format(pool))
    # Start some API Calls
    start = time.time()
    end = start
    for call in range(50):
        print("\tPool {} call {}...".format(pool, call))
        requests.post('http://127.0.0.1:5000/simtool_bp/{}/'.format(api_test_call),
                      data={
                          "case_network": "chapelcross",
                          "network": "chapelcross33kv",
                          "scenario": "",
                          "option": "5"
                      })
        end_ = time.time()
        print("\t\tPool {} call {} completed ({})".format(pool, call, round(end_-end,2)))
        end = end_
    end = time.time()
    print("Test pool {} completed ({})".format(pool, round(end-start,2)))


if __name__ == '__main__':
    # # Warm up, so you don't measure flask internal memory usage
    # for _ in range(10):
    #     requests.get('http://127.0.0.1:5000/foo')

    # Memory usage before API calls
    resp = requests.get('http://127.0.0.1:5000/memory')
    print(f'Memory before API call {int(resp.json().get("memory"))/(1024**2)}')

    # Take first memory usage snapshot
    resp = requests.get('http://127.0.0.1:5000/snapshot')

    workers = [mp.Process(target=test, args=('get_all_data', pool, )) for pool in range(os.cpu_count())]

    # Execute workers
    for p in workers:
        p.start()
    # Add worker to queue and wait until finished
    for p in workers:
        p.join()

    # Memory usage after
    resp = requests.get('http://127.0.0.1:5000/memory')
    print(f'Memory after API call: {int(resp.json().get("memory"))/(1024**2)}')

    # Take 2nd snapshot and print result
    resp = requests.get('http://127.0.0.1:5000/snapshot')
    pprint(resp.text)