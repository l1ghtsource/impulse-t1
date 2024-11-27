import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import fake_useragent
import os


def fetch_and_save_notion_content(url, file_path='./parsers/results/notion_content.txt'):
    user_agent = fake_useragent.UserAgent()

    options = webdriver.ChromeOptions()
    options.add_argument(f"user-agent={user_agent.random}")
    options.add_argument("--headless")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    chrome_service = Service(ChromeDriverManager().install())
    browser = webdriver.Chrome(service=chrome_service, options=options)

    browser.get(url)

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

        content = notion_app_element.text

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)

        print(f"Содержимое сохранено в файл: {file_path}")

    except Exception as e:
        print(f"Не удалось загрузить страницу или найти элемент {e}")
    finally:
        browser.close()
        browser.quit()

    return os.path.abspath(file_path)


# Пример использования функции
url = 'https://quickest-custard-3d3.notion.site/Dmitry-Konoplyannikov-7892b63ba7cb4000b45484147a783bf0'
file_path = fetch_and_save_notion_content(url)
print(f"Путь к файлу: {file_path}")
