<div align="center">

# FONDASI

### Creative Agency Landing Page

*Minimalist. Modern. Elegant.*

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

[Live Demo](https://fondasi-landing-page.vercel.app) · [Report Bug](https://github.com/Udyana30/Fondasi-Landing/issues) · [Request Feature](https://github.com/Udyana30/Fondasi-Landing/issues)

</div>

---

## ✨ About

**Fondasi** is a modern, minimalist landing page for a creative agency. Built with cutting-edge web technologies, it showcases services with elegance and sophistication.

### Key Features

- 🌐 **Multilingual Support** - Seamless switching between English and Indonesian
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎨 **Modern Design** - Clean, minimalist aesthetic with smooth animations
- 📧 **Contact Integration** - Email functionality with Nodemailer + Gmail
- ⚡ **Performance First** - Built with Next.js 16 and Turbopack
- 🎭 **Interactive UI** - Engaging animations with Framer Motion

---

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 16.1](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)

### Libraries
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) + React Three Fiber

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gmail account with App Password (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Udyana30/Fondasi-Landing.git
   cd Fondasi-Landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   ```

   > **Note:** Get your Gmail App Password from [Google Account Settings](https://myaccount.google.com/apppasswords)

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
fondasi-landing-page/
├── app/                      # Next.js App Router
│   ├── api/contact/         # Contact form API endpoint
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Contact/            # Contact CTA & Form
│   ├── Hero/               # Hero section
│   ├── Introduction/       # About section
│   ├── Navigation/         # Header & Menu
│   ├── Services/           # Services showcase
│   └── Footer/             # Footer section
├── lib/                     # Utilities & contexts
│   ├── contexts/           # React contexts
│   └── translations/       # i18n translations
└── public/                  # Static assets
```

---

## 🎨 Design Philosophy

### Minimalism
Clean layouts with generous white space, focusing on content over decoration.

### Elegance
Sophisticated typography using Playfair Display for headings and Geist Sans for body text.

### Modernity
Smooth animations, glassmorphism effects, and contemporary UI patterns.

### Responsiveness
Mobile-first approach with distinct layouts for different screen sizes.

---

## 📧 Contact Form Setup

The contact form uses **Nodemailer** with Gmail SMTP. Here's how it works:

1. **Email Flow:**
   - Sends from your personal Gmail (configured in `.env.local`)
   - Delivers to `fondasicreative@gmail.com`
   - Reply-to header set to form submitter's email

2. **Validation:**
   - **Client-side:** Real-time validation for better UX
   - **Server-side:** Security validation to prevent malicious requests

3. **Features:**
   - Name validation (letters only, no numbers)
   - Email format validation
   - Phone number format validation
   - Message minimum length (10 characters)

---

## 🌍 Multilingual Support

Switch between **English** and **Indonesian** with a single click.

- Language preference persisted in localStorage
- Seamless translation across all components
- Globe icon toggle in top-left corner

---

## 🎭 Key Components

### Hero Section
Animated beams background with bold typography and CTA button.

### Services
Tilted card design showcasing 5 core services with hover effects.

### Introduction
Spotlight card with agency image and compelling copy.

### Contact CTA
Beams background with prominent call-to-action and contact form modal.

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables:
     - `GMAIL_USER`
     - `GMAIL_APP_PASSWORD`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Variables

Make sure to add these in your Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `GMAIL_USER` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | 16-character App Password from Google |

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Fondasi Creative Agency**

- Website: [fondasicreative.com](https://fondasicreative.com)
- Email: fondasicreative@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**Built with ❤️ by Fondasi Creative Agency**

*Transforming ideas into digital experiences*

</div>
