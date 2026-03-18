# Secure-Social-Media-Application

# 🔐 SecureChat

A secure social media messaging application built with **React Native** and **TypeScript**, demonstrating end-to-end encryption, PKI-based key management, and X.509 certificate handling — all running locally on-device with no cloud dependency.

> Built as part of a university security module. Demonstrates real-world cryptographic principles applied to a mobile social media context.

---

## 📱 Overview

SecureChat allows users to post messages to a social feed that are **encrypted end-to-end**. Only members of a user's **Secure Group** can decrypt and read posts. To all other users, posts appear as raw ciphertext — exactly as they would on a platform like Facebook or WhatsApp if you were not part of the group.

The application implements a full **Public Key Infrastructure (PKI)** system, including keypair generation, X.509 certificate issuance, and hybrid encryption (RSA + AES-GCM), entirely on the mobile device.

---

## ✨ Features

- 🔑 **RSA-2048 keypair generation** per user, stored securely on-device
- 📜 **X.509 self-signed certificates** for user identity and key distribution
- 🔒 **AES-256-GCM post encryption** with per-post session keys
- 👥 **Secure Group management** — add or remove members with automatic re-keying
- 👁️ **Dual feed view** — group members see plaintext; outsiders see ciphertext
- 🚫 **No cloud required** — all cryptographic operations run locally on-device
- 🧪 **Seeded mock users** for full demo without needing multiple devices

---

## 🏗️ Project Structure

```
SecureChat/
│
├── app/                          # Expo Router screens
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── feed.tsx              # Main encrypted post feed
│   │   ├── groups.tsx            # Secure group management
│   │   └── profile.tsx           # Key & certificate viewer
│   └── _layout.tsx
│
├── src/
│   ├── crypto/                   # Core cryptographic module
│   │   ├── keyManager.ts         # RSA keypair generation & storage
│   │   ├── certificateManager.ts # X.509 certificate creation & verification
│   │   ├── encryption.ts         # AES-GCM encrypt/decrypt
│   │   ├── groupKeyManager.ts    # Session key wrapping per group member
│   │   └── types.ts
│   │
│   ├── storage/                  # Local persistence layer
│   │   ├── secureStore.ts        # Private key storage (expo-secure-store)
│   │   ├── localDb.ts            # Posts, certs, users (AsyncStorage)
│   │   └── mockUsers.ts          # Pre-seeded demo users with keypairs
│   │
│   ├── components/
│   │   ├── PostCard.tsx          # Renders plaintext or ciphertext by membership
│   │   ├── GroupMemberList.tsx
│   │   ├── CertificateBadge.tsx
│   │   └── EncryptedBadge.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── GroupContext.tsx
│   │
│   ├── hooks/
│   │   ├── useEncryptedFeed.ts
│   │   └── useGroupMembers.ts
│   │
│   └── utils/
│       ├── base64.ts
│       └── constants.ts
│
├── app.json
├── tsconfig.json
└── package.json
```

---

## 🔐 Cryptographic Design

SecureChat uses a **hybrid encryption scheme** — the same approach used in production secure messaging apps.

### Key Management Flow

```
1. User registers
       │
       ▼
2. RSA-2048 keypair generated on-device
       │
       ├── Private key → expo-secure-store (hardware-backed where available)
       └── Public key  → wrapped in X.509 self-signed certificate
                                │
                                ▼
                     3. Certificate stored locally
                        and shared with group members
```

### Post Encryption Flow

```
Alice writes a post
       │
       ▼
Random AES-256-GCM session key generated
       │
       ├── Post content encrypted with session key
       │
       └── Session key RSA-encrypted separately for each group member
                    │
                    ▼
         Ciphertext + wrapped keys stored locally
         → Group members can unwrap key with their RSA private key
         → Non-members only see ciphertext
```

### Group Re-keying (Add / Remove)

When a member is **removed** from a group, a new session key is generated and re-distributed to remaining members. This ensures forward secrecy — the removed user cannot decrypt future posts.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (TypeScript) |
| Routing | Expo Router (file-based) |
| Cryptography | `react-native-quick-crypto` |
| Secure Storage | `expo-secure-store` |
| Local Database | `@react-native-async-storage/async-storage` |
| Certificates | X.509 / PKCS standards |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator, or the **Expo Go** app on a physical device

### Installation

```bash
# Clone the repository
git clone https://github.com/mumareft/Secure-Social-Media-Application.git
cd SecureChat

# Install dependencies
npm install

# Install native crypto and storage modules
npx expo install react-native-quick-crypto expo-secure-store @react-native-async-storage/async-storage

# Start the development server
npx expo start
```

### Running the Demo

The app ships with **5 pre-seeded mock users** (Alice, Bob, Carol, Dave, Eve) each with pre-generated RSA keypairs and certificates. This allows you to demo the full encryption/decryption group flow on a single device without needing multiple accounts or a backend.

1. Log in as **Alice**
2. Create a Secure Group and add Bob and Carol
3. Post an encrypted message
4. Switch to **Dave** — the post appears as ciphertext
5. Switch to **Bob** — the post is fully decrypted
6. Remove Bob from the group and observe re-keying

---

## 🔒 Security Considerations

- Private keys never leave the device and are stored using the platform's secure enclave where available
- All cryptographic operations use well-established algorithms (RSA-2048, AES-256-GCM) via `react-native-quick-crypto`, which wraps OpenSSL
- Certificate verification is performed before any key exchange
- Session keys are unique per post — compromise of one post does not affect others
- Group removal triggers immediate re-keying to maintain forward secrecy

---

## 📚 Academic Context

This project was developed for a university **Security & Cryptography** module. It demonstrates:

- Public Key Infrastructure (PKI) design
- X.509 certificate creation and verification
- Hybrid encryption (asymmetric key exchange + symmetric data encryption)
- Secure group key management with add/remove semantics
- Secure on-device key storage

---

## 📄 License

MIT License — see `LICENSE` for details.