import json
import os
import requests
import sys
import gzip
import shutil
import pandas as pd
from tqdm import tqdm


url_list = ['http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/AMAZON_FASHION.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/All_Beauty.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Appliances.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Arts_Crafts_and_Sewing.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Automotive.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Books.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/CDs_and_Vinyl.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Cell_Phones_and_Accessories.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Clothing_Shoes_and_Jewelry.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Digital_Music.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Electronics.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Gift_Cards.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Grocery_and_Gourmet_Food.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Home_and_Kitchen.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Industrial_and_Scientific.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Kindle_Store.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Luxury_Beauty.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Magazine_Subscriptions.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Movies_and_TV.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Musical_Instruments.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Office_Products.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Patio_Lawn_and_Garden.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Pet_Supplies.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Prime_Pantry.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Software.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Sports_and_Outdoors.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Tools_and_Home_Improvement.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Toys_and_Games.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/categoryFiles/Video_Games.json.gz']

meta_url_list= ['http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_AMAZON_FASHION.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_All_Beauty.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Appliances.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Arts_Crafts_and_Sewing.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Automotive.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Books.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_CDs_and_Vinyl.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Cell_Phones_and_Accessories.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Clothing_Shoes_and_Jewelry.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Digital_Music.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Electronics.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Gift_Cards.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Grocery_and_Gourmet_Food.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Home_and_Kitchen.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Industrial_and_Scientific.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Kindle_Store.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Luxury_Beauty.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Magazine_Subscriptions.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Movies_and_TV.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Musical_Instruments.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Office_Products.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Patio_Lawn_and_Garden.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Pet_Supplies.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Prime_Pantry.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Software.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Sports_and_Outdoors.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Tools_and_Home_Improvement.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Toys_and_Games.json.gz',
 'http://deepyeti.ucsd.edu/jianmo/amazon/metaFiles2/meta_Video_Games.json.gz']


data_dict = {1: 'AMAZON_FASHION',
 2: 'All_Beauty',
 3: 'Appliances',
 4: 'Arts_Crafts_and_Sewing',
 5: 'Automotive',
 6: 'Books',
 7: 'CDs_and_Vinyl',
 8: 'Cell_Phones_and_Accessories',
 9: 'Clothing_Shoes_and_Jewelry',
 10: 'Digital_Music',
 11: 'Electronics',
 12: 'Gift_Cards',
 13: 'Grocery_and_Gourmet_Food',
 14: 'Home_and_Kitchen',
 15: 'Industrial_and_Scientific',
 16: 'Kindle_Store',
 17: 'Luxury_Beauty',
 18: 'Magazine_Subscriptions',
 19: 'Movies_and_TV',
 20: 'Musical_Instruments',
 21: 'Office_Products',
 22: 'Patio_Lawn_and_Garden',
 23: 'Pet_Supplies',
 24: 'Prime_Pantry',
 25: 'Software',
 26: 'Sports_and_Outdoors',
 27: 'Tools_and_Home_Improvement',
 28: 'Toys_and_Games',
 29: 'Video_Games'}

print("Starting up...")

def download(url: str, fname: str):
 resp = requests.get(url, stream=True)
 total = int(resp.headers.get('content-length', 0))
 with open(fname, 'wb') as file, tqdm(
         desc=fname,
         total=total,
         unit='iB',
         unit_scale=True,
         unit_divisor=1024,
 ) as bar:
  for data in resp.iter_content(chunk_size=1024):
   size = file.write(data)
   bar.update(size)

# create the proper directory structure
if not os.path.exists('./meta'):
    os.mkdir('./meta')
    print('Created dir for meta')
else:
    print('dir for meta exists')

if not os.path.exists('./review'):
    os.mkdir('./review')
    print('Created dir for review')
else:
    print('dir for review exists')

if not os.path.exists('./formatted'):
    os.mkdir('./formatted')
    print('Created dir for formatted')
else:
    print('dir for formatted exists')

for i in range(len(data_dict)):
 print(f'Choice {i+1} - {data_dict[i+1]}')

print(f'Choice 30 - Download ALL')

input_not_valid = True

while input_not_valid:
 user_choice = int(input('Please enter your dataset of choice(0 to exit): '))
 if user_choice in range(1,31):
  input_not_valid = False
 elif user_choice == 0:
  print('Exiting...')
  sys.exit()
 else:
  print('Invalid input! Enter a value that is between 0 and 29')

if not input_not_valid and user_choice != 30:

 list_data_dir = [i.split('/')[-1] for i in url_list]
 list_meta_data_dir = [i.split('/')[-1] for i in meta_url_list]
 print(f'You have selected {data_dict[user_choice]}')
 print(f'Downloading {data_dict[user_choice]}, please wait patiently...')

 # get the save dir of gzip file
 gzip_save_dir = f'review/{list_data_dir[user_choice-1]}'
 # get the save dir for the json file
 json_save_dir = gzip_save_dir[:-3]

 download(url_list[user_choice-1], gzip_save_dir)

 with gzip.open(gzip_save_dir, 'rb') as f_in:
  with open(json_save_dir, 'wb') as f_out:
   shutil.copyfileobj(f_in, f_out)

 os.remove(gzip_save_dir)

 print(f"Downloading: {list_meta_data_dir[user_choice-1]}")
 # download the items
 # get the save dir of gzip file
 gzip_save_dir = f'meta/{list_meta_data_dir[user_choice-1]}'
 # get the save dir for the json file
 json_save_dir = gzip_save_dir[:-3]

 download(meta_url_list[user_choice-1], gzip_save_dir)

 with gzip.open(gzip_save_dir, 'rb') as f_in:
  with open(json_save_dir, 'wb') as f_out:
   shutil.copyfileobj(f_in, f_out)

 os.remove(gzip_save_dir)

# download all the data
if not input_not_valid and user_choice == 30:
 print('Download all the data, the total reviews are 116GB and the total metadata are 96GB')
 for i in range(len(data_dict)):
  list_data_dir = [i.split('/')[-1] for i in url_list]
  list_meta_data_dir = [i.split('/')[-1] for i in meta_url_list]
  print(f'Downloading {data_dict[i+1]}, please wait patiently...')

  # get the save dir of gzip file
  gzip_save_dir = f'review/{list_data_dir[i]}'
  # get the save dir for the json file
  json_save_dir = gzip_save_dir[:-3]

  download(url_list[i], gzip_save_dir)

  with gzip.open(gzip_save_dir, 'rb') as f_in:
   with open(json_save_dir, 'wb') as f_out:
    shutil.copyfileobj(f_in, f_out)

  os.remove(gzip_save_dir)

  print(f"Downloading: {list_meta_data_dir[i+1]}")
  # download the items
  # get the save dir of gzip file
  gzip_save_dir = f'meta/{list_meta_data_dir[i]}'
  # get the save dir for the json file
  json_save_dir = gzip_save_dir[:-3]

  download(meta_url_list[i], gzip_save_dir)

  with gzip.open(gzip_save_dir, 'rb') as f_in:
   with open(json_save_dir, 'wb') as f_out:
    shutil.copyfileobj(f_in, f_out)

  os.remove(gzip_save_dir)

 print(f"Meta data and review data for {data_dict[i]} downloaded!")

