# this is Kiyo's brain!

from transformers import pipeline

def initalize_model():
    kiyo = pipeline('summarization', model='ainize/bart-base-cnn') #  google/pegasus-xsum
    return kiyo

def compute_summarize(text, model):
    summary = model(text, min_length=30, do_sample=False)

    return summary[0] #['summary_text']
