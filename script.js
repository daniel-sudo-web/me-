// Конфигурация групп
const coursesData = {
    1: ["Группа 101", "Группа 102", "Группа 103", "Группа 104", "Группа 105"],
    2: ["Группа 201", "Группа 202", "Группа 203", "Группа 204", "Группа 205", "Группа 206", "Группа 207"],
    3: ["Группа 301", "Группа 302", "Группа 303"]
};

let currentGroup = null;

// Показать нужную секцию
function showSection(sectionId) {
    document.querySelectorAll('.tab-content').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Показать группы выбранного курса
function renderGroups(courseId) {
    const container = document.getElementById('groups-container');
    container.innerHTML = '';
    document.getElementById('table-wrapper').style.display = 'none';

    coursesData[courseId].forEach(group => {
        const btn = document.createElement('button');
        btn.className = 'group-btn';
        btn.innerText = group;
        btn.onclick = () => loadSchedule(group);
        container.appendChild(btn);
    });
}

// Загрузить расписание для группы
function loadSchedule(groupName) {
    currentGroup = groupName;
    document.getElementById('table-wrapper').style.display = 'block';
    document.getElementById('current-group-title').innerText = "" + groupName;

    const tbody = document.getElementById('schedule-body');
    tbody.innerHTML = '';

    // Пытаемся достать сохраненные данные из localStorage
    const savedData = JSON.parse(localStorage.getItem('schedule_' + groupName));

    for (let i = 1; i <= 5; i++) {
        const rowData = savedData ? savedData[i - 1] : ["", "", "", "", "", "", ""];
        const tr = document.createElement('tr');
        
        // Номер пары
        tr.innerHTML = `<td>${i}</td>`;
        
        // Остальные ячейки (время, каб, дни недели)
        rowData.forEach(cellText => {
            const td = document.createElement('td');
            td.contentEditable = "true";
            td.innerText = cellText;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    }
}

// Сохранить расписание текущей группы
function saveCurrentSchedule() {
    if (!currentGroup) return;

    const rows = document.querySelectorAll('#schedule-body tr');
    const scheduleToSave = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];
        // Начинаем с индекса 1, чтобы пропустить номер пары
        for (let i = 1; i < cells.length; i++) {
            rowData.push(cells[i].innerText);
        }
        scheduleToSave.push(rowData);
    });

    localStorage.setItem('schedule_' + currentGroup, JSON.stringify(scheduleToSave));
    alert('Расписание для ' + currentGroup + ' успешно сохранено!');
}

// Логика студентов (простая)
function addStudent() {
    const input = document.getElementById('studentInput');
    if (input.value.trim() === "") return;
    
    const li = document.createElement('li');
    li.innerHTML = `${input.value} <button onclick="this.parentElement.remove()">x</button>`;
    document.getElementById('studentsList').appendChild(li);
    input.value = "";
}