# 🚀 **Guide Complete: Integrate Google Calendar with Strapi**

## 1. 🏗️ **Config de Google Cloud Console**

### **1.1 Create Project**
1. [Google Cloud Console](https://console.cloud.google.com/)
2. click **"Select a project"** > **"New Project"**
3. **Project name**: `alex-web` 
4. click **"Create"**

### **1.2 Enable Google Calendar API**
1.  **"APIs & Services"** > **"Library"**
2. search **"Google Calendar API"**
3. click **"Google Calendar API"**
4. click  **"Enable"**

### **1.3 Config OAuth consent screen**
1. Ve a **"APIs & Services"** > **"OAuth consent screen"**
2. **User Type**: select **"External"**
3.  **"Create"**

#### **Information de la App:**
- **App name**: `alex-web`
- **User support email**: `test@gmail.com`
- **Developer contact information**: `test@gmail.com`
- click **"Save and Continue"**

#### **Scopes:**
- Haz clic en **"Add or Remove Scopes"**
- Busca y agrega:
  - `https://www.googleapis.com/auth/calendar`
  - `https://www.googleapis.com/auth/calendar.events`
- Haz clic en **"Save and Continue"**

#### **Test Users:**
- click ***Audience***
- click **"+ Add Users"**
- add: `test@gmail.com`
- click **"Save and Continue"**

---

## 2. 🔑 **Config  OAuth 2.0**

### **2.1 Create Credentials OAuth 2.0**
1.  **"APIs & Services"** > **"Credentials"**
2. click  **"+ Create Credentials"** > **"OAuth 2.0 Client IDs"**
3. **Application type**: select **"Web application"**
4. **Name**: `name App`

#### **URIs de Redirect:**
- **Authorized redirect URIs**: 
  ```
  https://developers.google.com/oauthplayground
  ```
- click **"Create"**

### **2.2 Obtain Refresh Token**
1. [Google OAuth Playground](https://developers.google.com/oauthplayground/)
2. click in setting (⚙️)
3. click **"Use your own OAuth credentials"**
4. Write:
   - **OAuth Client ID**
   - **OAuth Client Secret**
5.  click  **"Close"**

#### **Select Scopes:**
1.In the APIs lists search and check:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
2. click  **"Authorize APIs"**
3. **Start session with**: `test@gmail.com`
4. Accept permission
5. click  **"Exchange authorization code for tokens"**
6. **Copia el Refresh token**

---

## 3. ⚙️ **Configuración de Strapi**

### **3.1 Variables de Entorno**
add the new var to `.env` :

# Google Calendar API Configuration
GOOGLE_CLIENT_ID=client_id
GOOGLE_CLIENT_SECRET=client_secret
GOOGLE_ADMIN_REFRESH_TOKEN=refresh_token
GOOGLE_CALENDAR_EMAIL=test@email.com


### **3.2 Install**
```bash
cd strapi
yarn add googleapis
```