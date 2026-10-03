Meltdown Prediction in Children with Autism

Authors
Zakia Batool Turabee - https://orcid.org/0000-0003-2613-7438
David J. Brown - https://orcid.org/0000-0002-1677-7485
Mufti Mahmud - https://orcid.org/0000-0002-2037-8348
Andreas Oikonomou - https://orcid.org/0000-0002-5069-3971
Muhammad Arifur Rahman - https://orcid.org/0000-0002-6774-0041
Andrew Burton - https://orcid.org/0000-0002-9073-8310
Nicholas Shopland - https://orcid.org/0000-0003-2082-9070

Affiliations
Department of Computer Science, Nottingham Trent University,
Nottingham NG11 8NS, United Kingdom
zakia.turabee2021@my.ntu.ac.uk
david.brown@ntu.ac.uk
mufti.mahmud@ntu.ac.uk

AI-TOP- an Erasmus+ funded project aimed at creating a platform to predict emotional dysregulation and engagement in children with Autism in learning enviorments, to support their learning experiences and make classrooms more inclusive. The study involved data collection from children primarily diagnosed with Autism Spectrum Condition (ASC) to track their engagement and arousal in classrooms e.g. smiling, calm, yawning, rocking, eyes on or off screen, etc. Children were recorded while playing Continuous Performance Test (CPT) games. Their recorded reactions were then labelled as engaged, bored, or frustrated with the help of an observational behavioural checklists created by educational psychologists with expertise in Autism from Nottingham City Council. Following the labelling process, videos were segmented into shorter clips according to the labels assigned. Facial landmark detection and pose landmark detection was performed using python library- MediaPipe to extract datapoints. The extracted datapoints for all the specified states and substates are presented in this dataset. 

Following are the three main states and their substates identified according to the observational behavioural checklists which was developed in consultation with experts in Autism from Nottingham City Council.

Engaged:
0 - Calm
1 - Smiling
2 - Eyes on game or tutor
3 - Responding to game
4 - Visibly excited
5 - Touching head or face

Bored:
0 - Yawning
1 - Eyes not on game or tutor
2 - Not responding to instruction
3 - Not interacting with game or tutor

Frustrated:
0 - Red face (no data was collected)
1 - Sweating (no data was collected)
2 - Twitching
3 - Fidgeting
4 - Scratching
5 - Flapping
6 - Rocking
7 - Touching face
8 - Touching head
9 - Touching ears
10 - Getting out of seat
11 - Walking off
12 - Visibly sad

A CSV file, for each of the substate of Bored and Frustrated condition is given. Each row of a CSV file represents a frame in a video segment and contains following fields:

filename - each of the video segment has a unique name and is repeated in the csv equal to the number of frames from which MediaPipe is able to detect datapoints. E.g. a video segment named 'trim_10_4cqDlHxa.mp4' has 88 frames from which MediaPipe extracted datapoints and thus present 88 times in the file labelled as yawning.

state - state of a child at a point in time

substate - code for the substate(mentioned above) of the child at a point in time which gives more clear description 

x1,y1,z1 ... x501,y501,z501 - 501 datapoints (33 landmarks from pose detection and 468 landmark from face detection) for each of the frame where x and y represents datapoint’s width and height while z represents the depth

Since the data for Engaged state was huge, it has been divided according to subjects. There were 38 subjects out of which one did not participate. In each of the participant's folder there are subfolders with codes 0-5 (substate for each code is mentioned above), which contains the corresponding csv file with datapoints. In addition, a metadata sheet is also provided which gives complete information of subjects, number of clips that are present for each of the substate along with the total number of frames. Any user who wishes to use engaged state data may use this sheet to pick and choose desired number of subjects according to the number of clips and total frames for each of the substate.

 


