"""
    Copyright (c) 2025 SeaBee All rights reserved.
    
    Due to jobsDB strengthening its anti-scraping measures, selenium is currently being used as a replacement for the requests library for scraping.

    Prerequisite: Install the driver according to your local Chrome version and add it to the environment variables.
                  You can find drivers at https://developer.chrome.google.cn/docs/chromedriver/downloads?hl=zh-cn
"""

import time, json, random
from datetime import datetime
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
}

compNameSet, jobTitleList = set(), []
detailList, reqList = [], []

browser = webdriver.Chrome()
browser.set_page_load_timeout(10) # 默认 10s 截止, 可以根据网络状态更改

def get_response(url, isPage=True):
    try:
        browser.get(url)
    except Exception:
        browser.execute_script("window.stop()") # 否则获取 page_source 会报错

    """
    TODO: Modify the stop criteria to halt loading once specific elements are rendered
          Scraping performance is suboptimal in Mainland China, sometimes > 1 min/page
    
    BUG:  the ClassName of target element would change every visit (?)
    """
    # 10s 内每 1s 进行轮询（默认 interval = 0.5s）
    # if isPage:
    #     WebDriverWait(browser, 10, 1)\
    #         .until(EC.presence_of_element_located((By.CLASS_NAME, '_1lns5ab0 _6c7qzn5c _6c7qznhk _6c7qzn70')))
    # else:
    #     WebDriverWait(browser, 10, 1)\
    #         .until(EC.presence_of_element_located((By.CLASS_NAME, '_1lns5ab0 _6c7qzn5c _6c7qznhk _6c7qzn7c')))

    return browser.page_source

def getReqs(jid):
    # 用 Salary Range 筛掉一些非应届生岗位
    detailURL = f'https://hk.jobsdb.com/job/{jid}?type=standard&amp;ref=search-standalone'
    page_source = get_response(detailURL, isPage=False)

    # parse
    soup = BeautifulSoup(page_source, 'html.parser')
    desc = soup.select('[data-automation="jobAdDetails"] > div > p')
    for t in desc:
        tagTitle = t.text.lower()
        isTar = 'requirement' in tagTitle or 'qualification' in tagTitle
        # print(tagTitle, isTar)
        if isTar:
            tags = t.find_next_sibling()
            if tags == None: break
            return [
                tag.text for tag in
                tags.find_all('p')
            ]
    print('Req Not Found')
    return False
 

def getJobInfo(job):
    jid = job['data-job-id'] # 8-bit string
    # detailURL = f'https://hk.jobsdb.com/job/{jid}?type=standard&amp;ref=search-standalone'
    # applyURL = f'https://hk.jobsdb.com/job/{jid}/apply'

    compName = job.find(attrs={'data-automation': f'jobCompany'}).text
    compNameSet.add(compName)
    
    return jid, {
        'title': job.find(attrs={'id': f'job-title-{jid}'}).text,
        'company': compName,
        'location': job.find(attrs={'data-automation': f'jobLocation'}).text,
        'classification': f"{job.find(attrs={'data-automation': f'jobSubClassification'}).text} {job.find(attrs={'data-automation': f'jobClassification'}).text}",
    }, getReqs(jid)

def scrabPage(pageIdx):
    # 用 Salary Range 筛掉一些非应届生岗位
    url = f'https://hk.jobsdb.com/e-commerce-jobs/full-time?page={pageIdx}&salaryrange=0-35000&salarytype=monthly&sortmode=ListedDate'
    page_source = get_response(url)

    # init parser
    soup = BeautifulSoup(page_source, 'html.parser')
    # 筛选单页面的所有 job
    for idx, job in enumerate(soup.select('[data-testid="job-card"]')):
        print(f'Job {pageIdx}-{idx}')
        jid, detail, reqs = getJobInfo(job)
        if reqs == False or len(reqs) == 0:
            continue
        else:
            print('OK')
        detailList.append({
            'jid': jid,
            'detail': detail
        })
        reqList.append({
            'jid': jid,
            'reqs': reqs
        })
        jobTitleList.append({
            'jid': jid,
            'title': detail['title']
        })
        # time.sleep(random.randint(5, 20))
        time.sleep(random.randint(1, 3))

if __name__ == '__main__':
    # 爬 10 页
    for idx in range(1, 21):
        print(idx)
        scrabPage(idx)
        print(f'Now get: {len(detailList)}')
    
    with open('time.log', 'w', encoding='utf-8') as f:
        f.write(f'Last Update: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')

    # 序列化（这边倒是巨快）
    with open('../data/jobDetail.json', 'w', encoding='utf-8') as f:
        json.dump({'jobs': detailList}, f, ensure_ascii=False, indent=4)

    with open('../data/jobReqs.json', 'w', encoding='utf-8') as f:
        json.dump({'jobs': reqList}, f, ensure_ascii=False, indent=4)

    with open('../data/company.json', 'w', encoding='utf-8') as f:
        json.dump({'companies': list(compNameSet)}, f, ensure_ascii=False, indent=4)

    with open('../data/jobTitle.json', 'w', encoding='utf-8') as f:
        json.dump({'titles': jobTitleList}, f, ensure_ascii=False, indent=4)