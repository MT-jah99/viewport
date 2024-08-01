// ข้อมูลจำลอง
const topics = ['การบ้าน', 'กิจกรรมกลุ่ม', 'การนำเสนอ', 'การสอบ'];
let votes = topics.map(() => 0);
let students = new Set();

// เริ่มต้นแอปพลิเคชัน
function initApp() {
    const topicsContainer = document.getElementById('topics');
    topics.forEach((topic, index) => {
        const button = document.createElement('button');
        button.className = 'topic';
        button.textContent = topic;
        button.onclick = () => vote(index);
        topicsContainer.appendChild(button);
    });
    updateResults();
}

// ฟังก์ชันล็อกอิน
function login() {
    const studentId = document.getElementById('studentId').value;
    if (studentId && !students.has(studentId)) {
        students.add(studentId);
        document.getElementById('login').style.display = 'none';
        document.getElementById('voting').style.display = 'block';
    } else {
        alert('รหัสนักเรียนไม่ถูกต้องหรือได้ลงคะแนนไปแล้ว');
    }
}

// ฟังก์ชันโหวต
function vote(index) {
    votes[index]++;
    updateResults();
    document.getElementById('voting').style.display = 'none';
}

// อัปเดตผลการโหวต
function updateResults() {
    const ctx = document.getElementById('chart').getContext('2d');
    
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topics,
            datasets: [{
                label: 'จำนวนโหวต',
                data: votes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    });
}

// เริ่มต้นแอปพลิเคชันเมื่อโหลดหน้าเว็บ
window.onload = initApp;