# Faceshield Classifier

--------------------------------------------------------------------------------
Steps on how to use the system:

  1. Click the "choose file" button.
  2. select and image in your local computer. (.png, .jpg, .jpeg, .gif only!)
  3. Select the "Identify Image: button.
  4. The result will load after you click the Identify Image button.
---------------------------------------------------------------------------------

## Problem & Limitation of the system:

  1. The confidence level result only appears 100% for every answer it gets, but it states the right answer for the classification of face shield.
  2. It cannot function in selecting multiple images at once. It can only detect one image at a time.
 
---------------------------------------------------------------------------------
 
 ## How the whole system was made:
 
  1. The system was first made on google colab using tensorflow & tensorflow.js.
  2. The images for "noshield" & "shielded" were stored in the Dataset folder in MyDrive.
  3. The image size is 250px.
  4. The Dataset folder has 2 paths which are "train" & "test" folders which has the 2 classes inside.
  5. I used softmax as an activation. Used sparse_categorical_crossentropy in loss and RMSprop as its optimizer and accuracy as its metrics.
  6. The model file that contained the .bin file and .json file was imported inside the react app in the src folder.
  7. I, then imported it to github inorder to set up in running the "npm start" command.
  8. I used Herokuapp to deploy the system.

----------------------------------------------------------------------------------
