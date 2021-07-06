# -*- coding: utf-8 -*-
import requests
from pprint import pprint
import os
import json
import pandas as pd
import multiprocessing as mp
import time
# import package.data.auth as auth_data
import cProfile
# import eventlet
# eventlet.monkey_patch()

N_POOLS = 4
K_REQUESTS = 4

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


def performance(api_test_calls, pool):
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
                              "password": "Desktop3",
                              "case_network": "chapelcross",
                              "network": "chapelcross33kv",
                              "scenario": "",
                              "option": "5"
                          })
        end_ = time.time()
        print("\t\tPool {} call {} completed ({})".format(pool, call, round(end_-end, 2)))
        end = end_
    end = time.time()
    print("Test pool {} completed ({})".format(pool, round(end-start,2)))


def run_performance_test():
    # Memory usage before API calls
    resp = requests.get(URL+'/memory')
    memory_before = int(resp.json().get("memory")) / (1024 ** 2)
    print(f'Memory before API call {memory_before}')

    # Take first memory usage snapshot
    resp = requests.get(URL+'/snapshot')

    # for _ in range(50):
    #     test("check_breakers", 0)

    # workers = [mp.Process(target=test, args=('get_all_data', pool, )) for pool in range(4)]
    workers = [mp.Process(target=performance, args=(LIST_CALLS, pool, )) for pool in range(N_POOLS)]

    # Execute workers
    for p in workers:
        p.start()
    # Add worker to queue and wait until finished
    for p in workers:
        p.join()

    # Memory usage after
    resp = requests.get(URL+'/memory')
    memory_after = int(resp.json().get("memory"))/(1024**2)
    print(f'Memory after API call: {memory_after}')
    print(f'Memory leak: {memory_after-memory_before}')

    # Take 2nd snapshot and print result
    resp = requests.get(URL+'/snapshot')
    pprint(resp.text)


def test_logins():
    df_users = pd.read_csv('/'.join([auth_data.BASE_DIR, 'req_users.csv']))
    for user in df_users.iterrows():
        user_data = user[1]
        r = requests.post('{}/{}'.format(URL, 'login'),
                      data={
                          "email": user_data['email'],
                          "password": "Desktop3",
                          "remember": True,
                          "case_network": "chapelcross",
                          "network": "chapelcross33kv",
                          "scenario": "",
                          "option": "5"
                      })
        r = requests.post('{}/{}'.format(URL, 'logout'),
                          data={
                              "email": user_data['email'],
                              "password": "Desktop3",
                              "remember": True,
                              "case_network": "chapelcross",
                              "network": "chapelcross33kv",
                              "scenario": "",
                              "option": "5"
                          })

def test_request():
    r = requests.post('{}/{}'.format(URL, 'signup'),
                  data={
                      "email": "DNO2@DTE.com",
                      "password": "Desktop3",
                      "remember": True,
                  })
    print(r)
    print(r.text)
    # print(r.json())

def testing():
    test_logins()
    run_performance_test()


if __name__ == '__main__':
    test_request()
