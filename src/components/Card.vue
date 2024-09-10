<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';
import { reactive, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
const courses = ref([])

onMounted(async () => {
    try {
        const response = await axios.get('https://apitest.shabujglobal.africa/api/courses')
        courses.value = response.data.data
        console.log(response.data.data)
    } catch (error) {
        console.error('error fetching course')
    }
})   

const emit = defineEmits(['delete']);
const form = reactive({
    country_name: '',
    university_name: '',
    course_name: '',
    tuition_fee: ''
})

const handleSubmit = async () => {
    const newCourse = {
        country_name: form.country_name,
        university_name: form.university_name,
        course_name: form.course_name,
        tuition_fee: form.tuition_fee
    }

    try {
        const response = await axios.post('https://apitest.shabujglobal.africa/api/courses', newCourse)
        courses.value.push(response.data.data);
        
        form.country_name = '';
        form.university_name = '';
        form.course_name = '';
        form.tuition_fee = '';

        document.getElementById('my_modal_3').close()
    } catch (error) {
        console.error('error posting course')
    }
}



const deleteJob = async (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this course?");

    if (!isConfirmed) {
        return; 
    }
    try {
            const response = await axios.delete(`https://apitest.shabujglobal.africa/api/courses/${id}`)
            emit('delete', id);
            courses.value = courses.value.filter( course=> course.id !== id);
            console.log('deleted')
        } catch (error) {
            console.error('error deleting course')
        }
}

</script>
<template>
    <div class="max-w-screen-2xl mx-auto">
        <div class="vue-card-header flex justify-between border p-3">
            <h2 class="font-semibold text-2xl pt-2">Courses</h2>
            <div>
                <button class="btn btn-info text-white" onclick="my_modal_3.showModal()">Add course</button>
                <dialog id="my_modal_3" class="modal">
                    <div class="modal-box">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div class="max-w-screen-2xl mx-auto p-10">
                            <h1 class="text-5xl text-center">Add Course</h1>
                            <form @submit.prevent="handleSubmit">
                                <div class="md:flex mb-8">
                                    <div class="form-control md:w-1/2">
                                        <label class="label">
                                            <span class="label-text">Country Name</span>
                                        </label>
                                        <input type="text" placeholder="Country Name" name="Country Name" v-model="form.country_name"
                                            class="input w-full input-bordered" />
                                    </div>
                                    <div class="form-control md:w-1/2 ml-4">
                                        <label class="label">
                                            <span class="label-text">University Name</span>
                                        </label>
                                        <input type="text" placeholder="University Name" name="University Name" v-model="form.university_name"
                                            class="input w-full input-bordered" />
                                    </div>
                                </div>
                                <div class="md:flex mb-8">
                                    <div class="form-control md:w-1/2">
                                        <label class="label">
                                            <span class="label-text">Course Name</span>
                                        </label>
                                        <input type="text" placeholder="Course Name" name="Course Name" v-model="form.course_name"
                                            class="input w-full input-bordered" />
                                    </div>
                                    <div class="form-control md:w-1/2 ml-4">
                                        <label class="label">
                                            <span class="label-text">Tuition Fee</span>
                                        </label>
                                        <input type="number" placeholder="Tuition Fee" name="Tuition Fee"
                                            v-model="form.tuition_fee" class="input w-full input-bordered" />
                                    </div>
                                </div>
                                <input type="submit" value="Add Course" class="btn btn-block text-white bg-purple-400" />
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
        <div class="vue-card-body">
            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Country Name</th>
                            <th>University Name</th>
                            <th>Cousre Name</th>
                            <th>Tuition Fee</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="course in courses" :key="course.id">
                            <td>{{ course.id }}</td>
                            <td>{{ course.country_name }}</td>
                            <td>{{ course.university_name }}</td>
                            <td>{{ course.course_name }}</td>
                            <td>{{ course.tuition_fee }}</td>
                            <td>{{ course.created_at }}</td>
                            <td>{{ course.updated_at }}</td>
                            <td class="space-x-4">
                                <RouterLink :to="{ name: 'editCourse', params: { id: course.id } }">
                                    <button class="btn btn-success text-white">Edit</button>
                                </RouterLink>
                                <button @click="deleteJob(course.id)" class="btn btn-error text-white">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>