### **اسم المشروع**: **NoteKeeper**  
**الوصف المختصر**: تطبيق ويب لإدارة الملاحظات يتيح للمستخدمين تسجيل الدخول، إضافة وتعديل وحذف ملاحظاتهم مع حماية الوصول باستخدام **JWT** والتحقق من صحة البيانات باستخدام **Joi**.

---

### **التقنيات المستخدمة**:
#### 1. **Frontend**:
- **Nuxt.js**: إطار عمل لبناء التطبيقات المتقدمة باستخدام Vue.js.
- **Tailwind CSS**: إطار عمل لتصميم الواجهات بسهولة مع تصميم مرن.
  
#### 2. **Backend**:
- **Express.js**: خادم تطبيقات ويب.
- **MariaDB**: قاعدة بيانات لتخزين بيانات المستخدمين والملاحظات.
- **JWT**: للتحقق من هوية المستخدم وحماية الوصول.
- **bcrypt**: لتشفير كلمات المرور.
- **Joi**: للتحقق من صحة البيانات المدخلة من المستخدم.
  
#### 3. **أدوات أخرى**:
- **Postman**: لاختبار الـ APIs.
- **Git**: لإدارة الكود والمشاركة.

---

### **المكونات الرئيسية**:
#### 1. **نظام تسجيل الدخول والتسجيل**:
   - **تسجيل مستخدم جديد**.
   - **تسجيل الدخول** باستخدام البريد الإلكتروني وكلمة المرور.
   - استخدام **JWT** لإنشاء توكن للتحقق من الهوية.
  
#### 2. **إدارة الملاحظات**:
   - **إضافة ملاحظة جديدة**.
   - **عرض الملاحظات الخاصة بالمستخدم**.
   - **تعديل الملاحظات**.
   - **حذف الملاحظات**.
  
#### 3. **حماية الوصول**:
   - استخدام **JWT** في كل الطلبات المحمية.
  
#### 4. **التحقق من البيانات**:
   - استخدام **Joi** للتحقق من صحة البيانات المدخلة (مثل البريد الإلكتروني وكلمة المرور والمحتوى).

---

### **مخطط المشروع**:

#### **1. قاعدة البيانات**:
   - **users**:
     - `id` (INT, PRIMARY KEY)
     - `email` (VARCHAR, UNIQUE)
     - `password` (VARCHAR)
     - `created_at` (TIMESTAMP)
  
   - **notes**:
     - `id` (INT, PRIMARY KEY)
     - `user_id` (INT, FOREIGN KEY -> users.id)
     - `note_content` (TEXT)
     - `created_at` (TIMESTAMP)
     - `updated_at` (TIMESTAMP)

#### **2. الخطوات التفصيلية (Backend)**:

##### 2.1 **تسجيل مستخدم جديد**:
- **POST /register**:
  - المدخلات: `email`, `password`.
  - التحقق من صحة البيانات باستخدام **Joi**.
  - تشفير كلمة المرور باستخدام **bcrypt**.
  - إضافة المستخدم إلى قاعدة البيانات.
  - المخرجات: رسالة نجاح أو فشل.

##### 2.2 **تسجيل الدخول**:
- **POST /login**:
  - المدخلات: `email`, `password`.
  - التحقق من صحة البيانات باستخدام **Joi**.
  - التحقق من صحة كلمة المرور.
  - توليد توكن **JWT**.
  - المخرجات: توكن JWT.

##### 2.3 **إدارة الملاحظات**:
- **POST /notes**:
  - المدخلات: `note_content` (محتوى الملاحظة).
  - التحقق من صحة البيانات باستخدام **Joi**.
  - ربط الملاحظة بـ `user_id` من التوكن.
  - المخرجات: ملاحظة جديدة محفوظة.

- **GET /notes**:
  - المدخلات: لا شيء.
  - التحقق من صلاحية التوكن.
  - المخرجات: جميع الملاحظات الخاصة بالمستخدم.

- **PUT /notes/:id**:
  - المدخلات: `note_content` (المحتوى المعدل).
  - التحقق من صلاحية التوكن.
  - المخرجات: ملاحظة محدثة.

- **DELETE /notes/:id**:
  - المدخلات: لا شيء.
  - التحقق من صلاحية التوكن.
  - المخرجات: رسالة نجاح أو فشل.

#### **3. حماية الوصول باستخدام JWT**:
- التحقق من التوكن في كل نقطة نهاية محمية باستخدام ميدلوير.

#### **4. التحقق من البيانات باستخدام Joi**:
- التحقق من صحة **البريد الإلكتروني**.
- التحقق من صحة **كلمة المرور** (بأنها تحتوي على حروف كبيرة وصغيرة وأرقام).
- التحقق من **محتوى الملاحظات** (بأن يكون النص غير فارغ).

---

### **المخطط البياني (API Endpoints)**:

1. **POST /register**:
   - المدخلات:
     - `email`: البريد الإلكتروني للمستخدم.
     - `password`: كلمة المرور.
   - المخرجات: رسالة نجاح أو فشل.

2. **POST /login**:
   - المدخلات:
     - `email`: البريد الإلكتروني.
     - `password`: كلمة المرور.
   - المخرجات: توكن JWT.

3. **POST /notes**:
   - المدخلات:
     - `note_content`: محتوى الملاحظة.
   - المخرجات: ملاحظة جديدة محفوظة.

4. **GET /notes**:
   - المدخلات: لا شيء.
   - المخرجات: قائمة الملاحظات الخاصة بالمستخدم.

5. **PUT /notes/:id**:
   - المدخلات:
     - `note_content`: المحتوى المعدل.
   - المخرجات: ملاحظة محدثة.

6. **DELETE /notes/:id**:
   - المدخلات: لا شيء.
   - المخرجات: رسالة نجاح أو فشل.

---

### **الخطوات المستقبلية**:
- إضافة إمكانية **البحث أو الفلاتر** على الملاحظات.
- إضافة **تصنيف للملاحظات** (مثل: المهم، الشخصي).
- تطوير **واجهة المستخدم باستخدام Nuxt.js و Tailwind CSS** لتوفير تجربة مستخدم أفضل.

---

**ملخص**:
المشروع يركز على **إدارة الملاحظات** مع التحقق من هوية المستخدمين باستخدام **JWT**، بالإضافة إلى حماية البيانات عبر التحقق باستخدام **Joi**. هذا يتيح لك تعلم كيفية بناء تطبيق شامل يشمل الـ Frontend و Backend مع قاعدة بيانات قوية وتحقق من البيانات.
