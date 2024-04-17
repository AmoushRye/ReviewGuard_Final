import pickle

# Load the pickled model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Print the loaded model
print(model)
