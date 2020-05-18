import requests
import os
import collections 
import json
import pandas as pd
import math
# import numpy as np
from scipy import spatial
# from numpy.linalg import norm

# get request to get top songs for users
MONGO_URL=os.environ.get('MONGO_URL')
response = requests.get(MONGO_URL+"/ml/songs/top")

# build a dictionary : 
# {<user_id_1>: 
#   {   <gernre1>: count,
#       <genre2>: count 
#   },
#  <user_id_2>: 
#   {   <gernre1>: count,
#       <genre2>: count 
#   },
# }
list_users = []
data_dict = {}
loaded_json = json.loads(response.content)
for x in loaded_json:
    list_users += [x]
    list_genre = []
    for y in loaded_json[x]:
        for l in y["genres"]:
            list_genre += l
    data_dict[x] = collections.Counter(list_genre)

# convert dict to dataframe and perform min-max normalization    
df = pd.DataFrame.from_dict(data_dict, orient='index').fillna(0).T
df=(df-df.min())/(df.max()-df.min())

# calculate cosine similarity
list_similarity=[]
list_user_complete=[]
for user in list_users:
    for user_2 in list_users:
        if user != user_2 and user_2 not in list_user_complete:
            cs = 1 - spatial.distance.cosine(df[user], df[user_2])
            list_similarity += [{"user1": user, "user2": user_2, "cosine_similarity": cs}]
    list_user_complete += [user]


r = requests.post(url=MONGO_URL+"/ml/update/similarity", data={"data": list_similarity})
