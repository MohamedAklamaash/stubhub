
# StubHub

**StubHub** is a microservices-based architecture project designed to build resilient and scalable services that operate independently. This architecture ensures modularity, maintainability, and fault tolerance for individual components.

---

## 🛠️ **Features**

- **Microservice Design:** Isolated, independent services for ticket management, order processing, payment handling, and expiration tracking.
- **Scalability:** Each service can scale individually based on demand.
- **Resilience:** Decoupled architecture enhances fault tolerance across the system.
- **DevOps Ready:** Includes Kubernetes manifests and `skaffold.yaml` for seamless local development and CI/CD integration.
- **TypeScript First:** Built with TypeScript for robust type checking and modern JavaScript features.
- **Integration Ready:** Uses `auth`, `client`, and `env` configurations for seamless service integration.

---

## 🧩 **Microservices Overview**

1. **Auth Service**  
   Handles user authentication and authorization using secure, token-based mechanisms.

2. **Ticket Service**  
   Manages ticket creation, updates, and listing functionalities.

3. **Order Service**  
   Processes user orders, managing state transitions efficiently.

4. **Payment Service**  
   Integrates payment gateways and processes secure transactions.

5. **Expiration Service**  
   Implements timers for order expiration, ensuring seamless user experience.

---

## 🚀 **Getting Started**

### Prerequisites
- **Node.js** and **npm**
- **Docker** for containerization
- **Kubernetes** for orchestration
- **Skaffold** for simplified local development

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedAklamaash/stubhub.git
   ```
2. Navigate to the project folder:
   ```bash
   cd stubhub
   ```
3. Set up environment variables in the `/env` directory.
4. Initialize and run the services:
   ```bash
   ./projinit.sh
   ```

### Deployment
Deploy the system using Kubernetes and Skaffold:
```bash
skaffold dev
```

---

## 📂 **Project Structure**

- **/auth**: Authentication microservice  
- **/client**: Front-end or API gateway  
- **/env**: Environment configuration files  
- **/expirationservice**: Manages order expiration logic  
- **/orderservice**: Processes and manages orders  
- **/paymentservice**: Handles payments  
- **/ticketservice**: Ticket management  

---

## 🌐 **Technologies Used**

- **Backend:** Node.js, TypeScript  
- **Containerization:** Docker  
- **Orchestration:** Kubernetes  
- **Local Development:** Skaffold  

---

## 🏆 **Why StubHub?**

This project demonstrates a strong understanding of distributed systems, microservices architecture, and DevOps best practices. Its modular design makes it an excellent showcase of scalability and resilience in modern software systems.

---

## 🤝 **Contributing**

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.

---

## 📄 **License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/MohamedAklamaash/stubhub/blob/main/LICENSE) file for details.

---

## 📬 **Contact**

Created by [Mohamed Aklamaash](https://github.com/MohamedAklamaash)  
For inquiries, connect on [LinkedIn](https://linkedin.com/in/mohamed-aklamaash-m-r-6a1409246) or follow on [Instagram](https://instagram.com/__aklamaash__).
