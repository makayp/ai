import { Message } from 'ai';

const mkdown0 = `
  Here's a comparison of some popular JavaScript libraries: **jQuery**, **React**, **Lodash**, and **D3.js**, including some basic code examples and a table that highlights their key differences.

### Code Examples:

#### 1. **jQuery:**
jQuery simplifies DOM manipulation, event handling, and AJAX interactions.

\`\`\`javascript
// jQuery example: Hiding an element on button click
$(document).ready(function() {
  $("#hideButton").click(function() {
    $("#elementToHide").hide();
  });
});
\`\`\`

#### 2. **React:**
React is a JavaScript library for building user interfaces, particularly for single-page applications.

\`\`\`javascript
// React example: Displaying a message
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello, React!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
\`\`\`

#### 3. **Lodash:**
Lodash is a utility library that provides functions for common programming tasks like working with arrays, objects, and functions.

\`\`\`javascript
// Lodash example: Using _.map to iterate over an array
const _ = require('lodash');

const numbers = [1, 2, 3];
const doubled = _.map(numbers, num => num * 2);
console.log(doubled);  // [2, 4, 6]
\`\`\`

#### 4. **D3.js:**
D3.js is a powerful library for creating data visualizations in the browser.

\`\`\`javascript
// D3.js example: Creating a simple bar chart
const data = [10, 20, 30, 40, 50];

const svg = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500);

svg.selectAll("rect")
  .data(data)
  .enter().append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", d => 500 - d)
  .attr("width", 50)
  .attr("height", d => d)
  .attr("fill", "blue");
\`\`\`

---

### Table Comparing Popular JavaScript Libraries:

| Feature             | jQuery                           | React                               | Lodash                           | D3.js                             |
|---------------------|----------------------------------|-------------------------------------|----------------------------------|-----------------------------------|
| **Primary Purpose**  | DOM manipulation, events, AJAX   | Building UIs for web applications   | Utility functions for arrays, objects, functions | Data-driven visualizations       |
| **DOM Manipulation** | Yes, very extensive              | No (uses a virtual DOM)             | No                               | No                                |
| **UI Components**    | No                               | Yes, components-based architecture  | No                               | No                                |
| **Data Binding**     | No                               | Yes, one-way data flow              | No                               | No                                |
| **Performance**      | Can be slower with large DOMs    | Efficient, thanks to virtual DOM    | High performance with data manipulation | High performance for complex visualizations |
| **Learning Curve**   | Easy to learn                    | Moderate (due to JSX, components)   | Easy to learn                    | Steep (due to custom visualizations)|
| **Main Use Case**    | Small websites, legacy projects  | Building dynamic user interfaces    | Functional programming, utility tasks | Data visualization and charts     |
| **Popularity**       | Very popular in legacy apps      | Very popular in modern apps         | Widely used for utility functions | Niche, but very powerful in data science|
| **Size**             | ~90KB                            | Varies (depends on app)             | ~75KB                            | ~200KB                            |

---

### Summary:
- **jQuery** is great for DOM manipulation, AJAX, and older websites but is less commonly used in modern projects with frameworks like React.
- **React** is focused on building dynamic, interactive UIs, especially for single-page applications (SPAs).
- **Lodash** is a utility library that simplifies working with JavaScript arrays, objects, and functions.
- **D3.js** is specialized for creating data visualizations, especially when working with complex datasets.

Each of these libraries has its specific use case depending on the requirements of your project.
`;

const mkdown1 = `
Inline math example: \\( E = mc^2 \\)

Block math example:
\\[
  f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2 \\pi i \\xi x} \\, d\\xi
\\]

To prove that \\( 100n + 2 \\leq O(n) \\) , we need to understand the concept of **Big-O notation** and how it works.

### Big-O Notation:
- **Big-O notation** describes an upper bound on the growth rate of a function as its input size grows.
- \( f(n) = O(g(n)) \) means there exist constants \( c > 0 \) and \( n_0 \) such that for all \( n \geq n_0 \), \\( f(n) \\leq c \\cdot g(n) \\).

In this case, we want to prove that \( 100n + 2 \) is in the class \( O(n) \). This means we need to show that \( 100n + 2 \) grows at most as fast as a constant multiple of \( n \) as \( n \) grows large.

Inline math example: \\( E = mc^2 \\)

### Proof:

We want to show that:

\\[
100n + 2 \\leq c \\cdot n
\\]

for some constant \\( c \\) and for sufficiently large \( n \).

1. **Rewrite the expression**:  
   We start with the expression \( 100n + 2 \). We need to show that this is bounded by some multiple of \( n \).

2. **Choose a constant \( c \)**:  
   We can try to find a constant \( c \) such that for sufficiently large \( n \), \( 100n + 2 \leq c \cdot n \). 

   Let’s manipulate the inequality:

   \\[
   100n + 2 \leq c \cdot n
   \\]

   Divide both sides by \( n \) (for \( n > 0 \)):

   \\[
   100 + \\frac{2}{n} \\leq c
   \\]

3. **Find the value of \( c \)**:  
   As \\( n \\) grows larger, \\( \\frac{2}{n} \\) approaches 0. So, for large enough \( n \), we can make \( 100 + \frac{2}{n} \) arbitrarily close to 100. Therefore, we can choose \( c = 101 \), and for sufficiently large \( n \), this inequality holds.

   Specifically, for \( n \geq 1 \), we can see that:

   \[
   100 + \frac{2}{n} \leq 101
   \]

   So, the inequality holds for \( c = 101 \) and for all \( n \geq 1 \).

4. **Conclusion**:  
   Therefore, we have shown that there exist constants \( c = 101 \) and \( n_0 = 1 \) such that:

   \[
   100n + 2 \leq 101 \cdot n
   \]

   This proves that \( 100n + 2 \) is \( O(n) \), because we have demonstrated that it is bounded above by a constant multiple of \( n \) for large enough \( n \).

### Final Answer:
\[
100n + 2 \leq O(n)
\]
is true, because we found that \( 100n + 2 \) grows at most linearly with \( n \), and is therefore in the set \( O(n) \).
`;

const mkdown2 = `
  Creating a custom AI assistant that performs specific tasks like booking a flight involves a combination of AI technologies, APIs, data handling, and user interaction design. Here's a roadmap to help you understand the process from learning how AI integration works in a basic chat assistant to building a sophisticated assistant that can handle specific tasks:

---

### **1. Foundations of AI and Natural Language Processing (NLP)**

Before diving into AI assistant development, it's important to understand the basics of AI and NLP.

#### **Topics to Learn:**
- **Machine Learning (ML):** Understand the basic concepts like supervised learning, unsupervised learning, and reinforcement learning.
- **Natural Language Processing (NLP):** Learn the fundamentals of NLP, including tokenization, named entity recognition, part-of-speech tagging, and sentiment analysis.
- **Large Language Models (LLMs):** Study how models like GPT, BERT, and T5 work.
- **Pre-trained Models and Fine-tuning:** Learn how to use pre-trained models and customize them for specific tasks.

#### **Resources:**
- **Books:** "Deep Learning" by Ian Goodfellow, "Speech and Language Processing" by Jurafsky and Martin.
- **Courses:** Stanford's NLP course, Fast.ai's deep learning courses.
- **Tools:** Hugging Face Transformers, OpenAI API.

---

### **2. Basic Chatbot Development**

Start by creating a simple chatbot. At this stage, you will learn how to integrate basic AI models for general conversation and how they respond to user queries.

#### **Topics to Learn:**
- **Introduction to Chatbots:** Learn the basic types of chatbots (rule-based, retrieval-based, generative-based).
- **Basic Chatbot with OpenAI API:** Use OpenAI's API to create a basic conversational assistant.
- **Handling User Input and Response Generation:** How to manage user input, and generate responses using AI.
- **Integrating with Frontend (e.g., React):** How to integrate your chatbot into a web application.

#### **Example Project:**
- Build a chatbot that answers general knowledge questions or performs simple tasks like setting reminders or telling jokes.

#### **Resources:**
- OpenAI Documentation on Chat Completion.
- Tutorials on building simple chatbots with React or Next.js.

---

### **3. Advanced AI Assistant: Tools and APIs**

Once you have a basic understanding, you can start building an AI assistant that can perform specific tasks like booking a flight. This involves combining NLP with external APIs.

#### **Topics to Learn:**
- **Task-Oriented AI Assistants:** Understand how AI assistants differ from regular chatbots by performing structured tasks.
- **Custom Instructions:** Learn how to set up system instructions and behaviors using AI platforms (like OpenAI's chat models).
- **Contextual Awareness:** Implement logic that maintains context over multiple interactions.
- **Integrating External APIs:** Learn how to connect the assistant with APIs that handle specific tasks (e.g., flight booking, calendar scheduling, weather).
  - **Flight APIs** like Skyscanner or Amadeus for searching and booking flights.
  - **Payment APIs** like Stripe for handling payments.
- **User Authentication and Authorization:** Learn how to manage user sessions, logins, and handle sensitive data securely.

#### **Example Project:**
- Build an assistant that helps the user book a flight by querying flight information through an external API, providing options, and processing the booking.

#### **Resources:**
- Explore OpenAI's **"ChatGPT with Functions"** to handle specific tasks.
- Look into **Zapier** for API integrations with minimal code.
- Learn how to interact with external APIs using **Axios** or **Fetch** in JavaScript.

---

### **4. Adding Structured Data and Databases**

To store user data and enable personalized experiences (e.g., keeping track of bookings or preferences), you'll need to add database functionality.

#### **Topics to Learn:**
- **Databases:** Learn how to use databases (SQL, NoSQL) to store user data and task histories.
  - SQL databases (e.g., PostgreSQL, MySQL) or NoSQL databases (e.g., MongoDB, Firebase).
- **Handling Sensitive Data:** Learn encryption techniques and secure handling of user data (e.g., user credentials, payment info).
- **Storing Conversational Context:** Learn how to persist chat logs, user interactions, and ongoing tasks.
- **Session Management:** Handle user sessions to maintain context between different interactions.

#### **Example Project:**
- Build a flight booking assistant that remembers past interactions, such as flight preferences or previous bookings.

#### **Resources:**
- Tutorials on building CRUD applications with Next.js and a database.
- Learn about **authentication** and **authorization** using OAuth (e.g., with Supabase or Firebase).

---

### **5. Handling Advanced Tasks and Multi-Step Workflows**

When building a task-oriented assistant (e.g., booking a flight), you’ll need to design multi-step workflows and handle more complex user interactions.

#### **Topics to Learn:**
- **Dialog Management:** Design multi-turn conversations where the assistant needs to guide the user through a series of steps (e.g., booking flight -> selecting dates -> selecting passengers).
- **State Management:** Use state management to handle the flow of a task (e.g., tracking the status of the booking process).
- **Error Handling and Validation:** Ensure the assistant can handle errors gracefully (e.g., invalid dates or payment failures).
- **Personalization:** Implement personalized responses based on user data or preferences.
- **Natural Language Understanding (NLU):** Improve your assistant’s ability to understand user intent and extract structured data from unstructured input.

#### **Example Project:**
- A full-featured flight booking assistant that includes features like payment processing, booking confirmation, and reminders.

#### **Resources:**
- Explore **Rasa** for dialog management and conversational workflows.
- Use libraries like **XState** for managing complex state machines in your assistant.

---

### **6. Deployment and Scalability**

Once your AI assistant is working well, you’ll want to deploy it to production and ensure it can handle a growing number of users.

#### **Topics to Learn:**
- **Deploying the Assistant:** Learn how to deploy the assistant using platforms like Vercel, AWS, or DigitalOcean.
- **Rate Limiting and Throttling:** Implement rate limiting to prevent abuse and control costs.
- **Monitoring and Analytics:** Set up logging and analytics to monitor the assistant’s performance.
- **Scaling the AI Infrastructure:** Learn how to scale the assistant to handle a larger volume of requests.

#### **Resources:**
- Learn how to deploy Next.js apps with **Vercel** or **Netlify**.
- Explore tools like **Datadog** or **Prometheus** for monitoring API usage and performance.

---

### **7. Future Enhancements**

Once you have the basic functionality working, you can continue improving the assistant by adding more features.

#### **Topics to Explore:**
- **Voice Assistants:** Add voice input and output capabilities using APIs like **Google Speech-to-Text** and **Text-to-Speech**.
- **Integrating with IoT Devices:** Extend the assistant’s abilities by integrating with smart home devices or other IoT platforms.
- **Multilingual Support:** Add support for multiple languages using translation APIs or multilingual models.
- **Advanced Fine-tuning:** Fine-tune the assistant to improve its task performance or general knowledge.

#### **Example Project:**
- Expand your flight assistant to allow voice input and output, enabling users to speak their flight preferences and hear responses.

#### **Resources:**
- Tutorials on integrating **Google Cloud Text-to-Speech** and **Speech-to-Text** APIs.
- Explore multilingual models like **MarianMT** for translation tasks.

---

### **Summary Roadmap:**
1. **Learn Basic AI/NLP Concepts**
2. **Build a Basic Chatbot**
3. **Integrate External APIs for Task-Oriented Functions**
4. **Implement Databases and Manage User Data**
5. **Create Multi-Step Workflows for Complex Tasks**
6. **Deploy and Scale Your Assistant**
7. **Enhance Your Assistant with Voice, IoT, and Multilingual Support**

---

This roadmap will guide you from understanding the fundamentals of AI and chatbot development to building and scaling an AI assistant capable of performing complex tasks like booking a flight. Let me know if you need more resources or examples at any stage!
`;

export const messages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Make some comparisons between java and javascript',
  },

  {
    id: '2',
    role: 'assistant',
    content: mkdown0,
  },
];
