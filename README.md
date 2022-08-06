# Kiyo
AI page summarisation implemented as a chromium plugin

<img src="https://user-images.githubusercontent.com/64489325/157848644-3d522465-f759-4a75-a3ba-d6554bcfb0bb.png" width=200px>

### Tired of reading long web pages?

Kiyo can help! By using state-of-the-art machine learning (nlp), Kiyo summarizes the text for you! Just like that:

![kiyo](https://user-images.githubusercontent.com/64489325/183253130-321889be-b813-4113-878b-c267114019de.gif)

### ⚙️ How it works
The extensions reads the text you've highlighted and sends it to a REST API (Build with API Gateway). This invokes a serverless Lambda function which itself invokes a machine learning endpoint deployed on sagemaker. There the summarization is predicted and the result gets send back to your browser.

If you want to learn more, have a look at my [blog post]()

### 💾 Install
1. Download the packed extension
2. Navigate to the extensions setting in your chromium browser. (You should see an overview of all installed)
3. Drag and drop the `KiyoExtension.crx` file into the browser. (You may need to enable developer mode)

✅ That's it! Kiyo will be visible in the extensions menu in the top right.
 
> Info: Chrome recently switched their extensions to v3, which can't yet be ported to firefox. I will try to do that as soon as possible.

### ❤️ Support me
You can use crypto to "buy me a coffe" through MetaMask by pressing the coffe button in the extension or use my [wallet adress](https://etherscan.io/address/0x2d36e55Fe253628F257DcF8090b2503834ec02D5)
Thanks!
