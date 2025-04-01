# To-Do List: Building the Envelope Budgeting App (Monorepo Approach)\
\
This to-do list outlines the steps to develop the Envelope Budgeting App using a single Git repository with separate directories for Web Frontend, Backend, iOS Frontend, and Android Frontend. Branches will be used to manage development of each part. Tasks are grouped by phases for clarity.\
\
---\
\
## Phase 0: Foundation & Setup\
*Goal: Establish a single repository and basic project structure.*\
\
- [x] **Set Up Single Repository**\
  - [x] Create one Git repository (e.g., `git init envelope-budgeting-app` or via GitHub).\
  - [x] Create top-level directories: `web-frontend/`, `backend/`, `ios-frontend/`, `android-frontend/`.\
  - [x] Add a simple `README.md` in the root explaining the structure (e.g., "Monorepo for Envelope Budgeting App").\
- [x] **Initialize Git Workflow**\
  - [x] Create a `main` branch as the stable base (initial commit with empty dirs).\
  - [x] Create feature branches: `web-dev`, `backend-dev`, `ios-dev`, `android-dev` (from `main`).\
  - [x] Keep it simple: Work in these branches, merge to `main` when stable.\
  - [x] Push all branches to GitHub repository and rename master to main.\
- [x] **Install Development Tools**\
  - [x] Ensure team has SDKs/runtimes (Node.js, Swift, Kotlin) and IDEs (VS Code, Xcode, Android Studio).\
  - [x] Configure linters/formatters in each directory (e.g., ESLint + Prettier in `web-frontend/`, SwiftLint in `ios-frontend/`).\
- [x] **Initialize Projects**\
  - [x] In `web-frontend/`: Set up React/Vue project (e.g., `npx create-react-app .`).\
  - [x] In `backend/`: Set up Node.js/Express or similar (e.g., `npm init`).\
  - [x] In `ios-frontend/`: Create Xcode project with Swift (e.g., via Xcode UI).\
  - [x] In `android-frontend/`: Create Android Studio project with Kotlin.\
- [ ] **Configure Cloud Infrastructure**\
  - [ ] Set up a development PostgreSQL instance (e.g., AWS RDS).\
  - [ ] Set up basic CI/CD (e.g., GitHub Actions in root `.github/workflows/` to build/test each dir).\
- [x] **Define API Structure**\
  - [x] Create an OpenAPI spec or Postman collection in `backend/docs/` for key endpoints (e.g., `/auth`, `/budgets`).\
- [x] **Set Up Dependency Management**\
  - [x] Initialize `package.json` in `web-frontend/` and `backend/`.\
  - [x] Set up `Podfile` or Swift Package Manager in `ios-frontend/`.\
  - [x] Set up `build.gradle` in `android-frontend/`.\
\
---\
\
## Phase 1: Core UI Shell & Authentication\
*Goal: Build basic UI and authentication in each frontend directory.*\
\
- [x] **Web Frontend (Branch: `web-dev`)**\
  - [x] In `web-frontend/`: Design main layout (Header, Nav, Content, Footer).\
  - [x] Set up routing (e.g., React Router: `/login`, `/register`, `/budget`).\
  - [x] Build Login and Registration form components with validation.\
  - [x] Add placeholder components (Budget, Accounts, etc.).\
  - [x] Set up state management (e.g., Redux Toolkit in `web-frontend/src/store/`).\
  - [x] Commit changes to `web-dev`, test locally.\
- [x] **Mobile Frontend (Branches: `ios-dev`, `android-dev`)**\
  - [x] In `ios-frontend/`: Set up Tab Bar navigation, add placeholder screens.\
  - [x] In `android-frontend/`: Set up BottomNavigationView, add placeholder screens.\
  - [x] Build native Login and Registration screens in both.\
  - [x] Commit changes to respective branches.\
\
---\
\
## Phase 2: Backend Foundation & User/Budget Management\
*Goal: Set up backend and connect it to frontends.*\
\
- [x] **Backend (Branch: `backend-dev`)**\
  - [x] In `backend/`: Configure framework (e.g., Express) and connect to PostgreSQL (e.g., via Prisma in `backend/prisma/`).\
  - [x] Define and migrate `Users` and `Budgets` tables (e.g., `backend/prisma/schema.prisma`).\
  - [x] Implement auth APIs (`POST /auth/register`, `/login`, `/logout`, password reset).\
  - [x] Implement user profile APIs (`GET /user/profile`, `PUT /user/profile`).\
  - [x] Implement budget APIs (`GET /budgets`, `POST /budgets`, etc.).\
  - [x] Commit changes to `backend-dev`. (Note: Committed to master, merge conflicts with backend-dev to resolve)\
- [ ] **Integration**\
  - [ ] In `web-dev`: Connect Login/Register to backend APIs, store tokens (e.g., `localStorage`).\
  - [ ] In `ios-dev` and `android-dev`: Connect native auth screens to APIs, store tokens (e.g., Keychain, SecureStorage).\
  - [ ] Test auth flow across all frontends, merge stable changes to `main`.\
- [x] **Testing**\
  - [x] Write unit tests for auth APIs in `backend/tests/`.\
  - [ ] Test frontend auth UI manually or with simple scripts.\
\
---\
\
## Phase 3: Core Budgeting Feature - Budget Screen\
*Goal: Build the budgeting interface.*\
\
- [ ] **Backend (Branch: `backend-dev`)**\
  - [ ] Define `CategoryGroups`, `Categories`, `BudgetEntries` tables.\
  - [ ] Build TBB, Activity, Available calculation logic (mock transactions).\
  - [ ] Implement `/budgets/\{budgetId\}/budget_view` and CRUD APIs for categories.\
  - [ ] Add `/assign` and `/move_money` APIs.\
- [ ] **Web Frontend (Branch: `web-dev`)**\
  - [ ] Build grid component in `web-frontend/src/components/BudgetGrid.js`.\
  - [ ] Add collapsible groups, TBB display, Month Navigation.\
  - [ ] Connect to APIs, implement Move Money modal, Quick Budgeting buttons.\
- [ ] **Mobile Frontend (Branches: `ios-dev`, `android-dev`)**\
  - [ ] Build adapted Budget Screen UI in each.\
  - [ ] Connect to budget APIs.\
- [ ] **Testing**\
  - [ ] Test calculations in `backend-dev`.\
  - [ ] Test UI interactions in each frontend branch, merge to `main` when stable.\
\
---\
\
## Phase 4: Accounts & Transactions\
*Goal: Add account and transaction management.*\
\
- [ ] **Backend (Branch: `backend-dev`)**\
  - [ ] Define `Accounts`, `Transactions`, `Payees`, `SplitTransactions` tables.\
  - [ ] Implement Account and Transaction CRUD APIs.\
  - [ ] Add balance calculation logic.\
- [ ] **Web Frontend (Branch: `web-dev`)**\
  - [ ] Build Accounts list UI in `web-frontend/src/components/Accounts.js`.\
  - [ ] Build Transaction list and entry form (with splits).\
  - [ ] Connect to APIs.\
- [ ] **Mobile Frontend (Branches: `ios-dev`, `android-dev`)**\
  - [ ] Build native Accounts and Transactions UIs.\
  - [ ] Connect to APIs.\
- [ ] **Testing**\
  - [ ] Test backend logic, merge to `main`.\
\
---\
\
## Phase 5: Linking, Reconciliation, Transfers\
*Goal: Integrate bank sync, reconciliation, and transfers.*\
\
- [ ] **Backend (Branch: `backend-dev`)**\
  - [ ] Set up Plaid integration (APIs in `backend/plaid/`).\
  - [ ] Add reconciliation APIs and transfer logic.\
- [ ] **Web Frontend (Branch: `web-dev`)**\
  - [ ] Add Plaid Link UI, imported transaction approval, reconciliation workflow.\
  - [ ] Update Transaction form for transfers.\
- [ ] **Mobile Frontend (Branches: `ios-dev`, `android-dev`)**\
  - [ ] Implement native UIs for these features.\
- [ ] **Testing**\
  - [ ] Test Plaid, reconciliation, transfers, merge to `main`.\
\
---\
\
## Phase 6: Goals & Overspending\
*Goal: Add goals and overspending handling.*\
\
- [ ] **Backend (Branch: `backend-dev`)**\
  - [ ] Define `Goals` table, implement CRUD APIs.\
  - [ ] Add overspending logic to `/budget_view`.\
- [ ] **Web Frontend (Branch: `web-dev`)**\
  - [ ] Build goal UI, show progress on Budget grid.\
  - [ ] Add overspending indicators and prompts.\
- [ ] **Mobile Frontend (Branches: `ios-dev`, `