# -*- coding: utf-8 -*-
import requests
from pprint import pprint
import os
import multiprocessing as mp
import time

N_POOLS = 4
K_REQUESTS = 100

local = False

LIST_CALLS = [
    'auth/login',
    'simtool_bp/get_breakers/',
    'simtool_bp/get_network_view/',
    'simtool_bp/get_actions/',
    'simtool_bp/get_steps/',
    # 'simtool_bp/get_all_data/',
    'auth/logout',
]

URL = "http://127.0.0.1:5000" if local else "https://desktopstudies.herokuapp.com"


def test(api_test_calls, pool):
    print("Starting pool {}...".format(pool))
    # Start some API Calls
    start = time.time()
    end = start
    time.sleep(pool * 2)
    for call in range(K_REQUESTS):
        print("\tPool {} call {}...".format(pool, call))
        for api_test_call in api_test_calls:
            requests.post('{}/{}'.format(URL, api_test_call),
                          data={
                              "email": "{}@{}.com".format(call+1, call+1),
                              "password": "Desktop2",
                              "case_network": "chapelcross",
                              "network": "chapelcross33kv",
                              "scenario": "",
                              "option": "5"
                          })
            time.sleep(1.5)
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
    resp = requests.get(URL+'/memory')
    print(f'Memory before API call {int(resp.json().get("memory"))/(1024**2)}')

    # Take first memory usage snapshot
    resp = requests.get(URL+'/snapshot')

    # for _ in range(50):
    #     test("check_breakers", 0)

    # workers = [mp.Process(target=test, args=('get_all_data', pool, )) for pool in range(4)]
    workers = [mp.Process(target=test, args=(LIST_CALLS, pool, )) for pool in range(N_POOLS)]

    # Execute workers
    for p in workers:
        p.start()
    # Add worker to queue and wait until finished
    for p in workers:
        p.join()

    # Memory usage after
    resp = requests.get(URL+'/memory')
    print(f'Memory after API call: {int(resp.json().get("memory"))/(1024**2)}')

    # Take 2nd snapshot and print result
    resp = requests.get(URL+'/snapshot')
    pprint(resp.text)