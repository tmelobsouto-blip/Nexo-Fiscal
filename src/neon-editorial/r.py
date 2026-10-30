from playwright.sync_api import sync_playwright
import os
d=os.getcwd()
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--allow-file-access-from-files'])
    pg=b.new_page(viewport={'width':1080,'height':1350})
    for i in range(1,5):
        pg.goto(f'file://{d}/{i}.html');pg.wait_for_timeout(500);pg.screenshot(path=f'slide-0{i}.png')
    b.close()
