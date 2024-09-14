document.addEventListener('DOMContentLoaded', function() {
    const tasks = [1, 2, 3];
    const totalEarnedElement = document.getElementById('total-earned');
    
    function calculateTotalEarned() {
        let total = 0;
        tasks.forEach(taskNumber => {
            const taskTotal = parseFloat(document.getElementById(`task${taskNumber}-total`).textContent.replace('$', '')) || 0;
            total += taskTotal;
        });
        totalEarnedElement.textContent = `$${total.toFixed(2)}`;
    }
    
    tasks.forEach(taskNumber => {
        const nameInput = document.getElementById(`task${taskNumber}-name`);
        const wageInput = document.getElementById(`task${taskNumber}-wage`);
        const hoursInput = document.getElementById(`task${taskNumber}-hours`);
        const totalEarned = document.getElementById(`task${taskNumber}-total`);
        
        function calculateTotal() {
            const wage = parseFloat(wageInput.value) || 0;
            const hours = parseFloat(hoursInput.value) || 0;
            const total = (wage * hours).toFixed(2);
            totalEarned.textContent = `$${total}`;
            calculateTotalEarned();
        }
        
        nameInput.addEventListener('blur', () => {
            if (nameInput.value.trim() !== '') {
                const taskName = document.createElement('span');
                taskName.textContent = nameInput.value;
                taskName.className = 'task-name';
                nameInput.parentNode.replaceChild(taskName, nameInput);
                
                taskName.addEventListener('click', () => {
                    const newInput = document.createElement('input');
                    newInput.type = 'text';
                    newInput.value = taskName.textContent;
                    newInput.id = `task${taskNumber}-name`;
                    taskName.parentNode.replaceChild(newInput, taskName);
                    newInput.focus();
                    
                    newInput.addEventListener('blur', () => {
                        if (newInput.value.trim() !== '') {
                            taskName.textContent = newInput.value;
                            newInput.parentNode.replaceChild(taskName, newInput);
                        }
                    });
                });
            }
        });
        
        wageInput.addEventListener('input', calculateTotal);
        hoursInput.addEventListener('input', calculateTotal);
    });
});
