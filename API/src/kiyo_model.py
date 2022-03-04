# this is Kiyo's brain!

from transformers import pipeline

def compute_summarize(text):
    kiyo = pipeline('summarization', model='sshleifer/distilbart-cnn-12-6')
    summary = kiyo(text, min_length=30, do_sample=False)

    return summary[0]
