
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC
import fake_useragent

user_agent = fake_useragent.UserAgent()

chrome_driver_path = "C:\DriversSelenium\chromedriver\chromedriver-win64-version-131.0.6778.86\chromedriver.exe"

options = webdriver.ChromeOptions()
options.add_argument(f"user-agent={user_agent.random}")
options.add_argument("--headless")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option('excludeSwitches', ['enable-logging'])

chrome_service = Service(chrome_driver_path)
browser = webdriver.Chrome(service=chrome_service, options=options)

website = 'https://quickest-custard-3d3.notion.site/Dmitry-Konoplyannikov-7892b63ba7cb4000b45484147a783bf0'

browser.get(website)

try: 
    time.sleep(5)
    WebDriverWait(browser, 60).until(EC.presence_of_element_located((By.TAG_NAME, 'body'))) 
    print("Страница успешно загружена") 

    notion_app_element = WebDriverWait(browser, 40).until(
        EC.presence_of_element_located((By.ID, 'notion-app'))
    )

    # buttons = browser.find_elements(By.CSS_SELECTOR, 'div[role="button"]')
    # for button in buttons:
    #     try:
    #         button.click()
    #         print(f"Клик по кнопке: {button.text}")
    #     except Exception as e:
    #         print(f"Не удалось кликнуть по кнопке: {e}")

    print(notion_app_element.text)
except Exception as e: 
    print(f"Не удалось загрузить страницу или найти элемент {e}") 
finally:
    browser.close()
    browser.quit()
