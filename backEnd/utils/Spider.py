import requests
import time
import random
import json
from datetime import datetime
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
}

compNameSet = set()
detailList = []
reqList = []

def getReqs(jid):
    # 用 Salary Range 筛掉一些非应届生岗位
    detailURL = f'https://hk.jobsdb.com/job/{jid}?type=standard&amp;ref=search-standalone'
    response = requests.get(detailURL, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
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
        return None
    else:
        print('Request Failed', response.status_code)
        return None

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
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        # init parser
        soup = BeautifulSoup(response.text, 'html.parser')
        # 筛选单页面的所有 job
        for idx, job in enumerate(soup.select('[data-testid="job-card"]')):
            print(f'Job {pageIdx}-{idx}')
            jid, detail, reqs = getJobInfo(job)
            if reqs == None or len(reqs) == 0:
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
            # time.sleep(random.randint(5, 20))
            time.sleep(random.randint(1, 3))
    else:
        print('Request Failed', response.status_code)
        return

if __name__ == '__main__':
    # 爬 10 页
    for idx in range(1, 21):
        print(idx)
        scrabPage(idx) # 爬了快 18min
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