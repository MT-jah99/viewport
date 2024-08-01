// ข้อมูลจำลอง
const topics = ['การบ้าน', 'กิจกรรมกลุ่ม', 'การนำเสนอ', 'การสอบ'];
let votes = topics.map(() => 0);
let students = new Set();

// เริ่มต้นแอปพลิเคชัน
function initApp() {
    console.log('Initializing app...');
    const topicsContainer = document.getElementById('topics');
    if (!topicsContainer) {
        console.error('Topics container not found');
        return;
    }
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
    console.log('Attempting login...');
    const studentId = document.getElementById('studentId');
    if (!studentId) {
        console.error('Student ID input not found');
        return;
    }
    if (studentId.value && !students.has(studentId.value)) {
        console.log('Login successful');
        students.add(studentId.value);
        document.getElementById('login').style.display = 'none';
        document.getElementById('voting').style.display = 'block';
    } else {
        console.log('Login failed');
        alert('รหัสนักเรียนไม่ถูกต้องหรือได้ลงคะแนนไปแล้ว');
    }
}

// ฟังก์ชันโหวต
function vote(index) {
    console.log('Voting for topic:', topics[index]);
    votes[index]++;
    updateResults();
    document.getElementById('voting').style.display = 'none';
}

// อัปเดตผลการโหวต
function updateResults() {
    console.log('Updating results...');
    const chartElement = document.getElementById('chart');
    
    if (!chartElement) {
        console.error('Chart element not found');
        return;
    }
    
    if (!(chartElement instanceof HTMLCanvasElement)) {
        console.error('Chart element is not a canvas');
        return;
    }
    
    const ctx = chartElement.getContext('2d');
    
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
window.onload = function() {
    console.log('Page loaded');
    initApp();
    
    // เพิ่ม event listener สำหรับปุ่มล็อกอิน
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', login);
    } else {
        console.error('Login button not found');
    }
};
