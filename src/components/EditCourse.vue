<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { reactive, defineEmits, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const courseId = route.params.id;
const state = reactive({
    course: {},
    isloading: true
})

const emit = defineEmits(['courseAdded']);

const form = reactive({
    country_name: '',
    university_name: '',
    course_name: '',
    tuition_fee: ''
})

const handleSubmit = async () => {
    const updateCourse = {
        country_name: form.country_name,
        university_name: form.university_name,
        course_name: form.course_name,
        tuition_fee: form.tuition_fee
    }

    try {
        const response = await axios.put(`https://apitest.shabujglobal.africa/api/courses/${courseId}`, updateCourse)
        emit('courseAdded', response.data.data)
        router.push('/');
        
    } catch (error) {
        console.error('error posting course')
    }
}
onMounted(async () => {
    try {
        const response = await axios.get(`https://apitest.shabujglobal.africa/api/courses/${courseId}`)
        state.course = response.data.data
        form.country_name = state.course.country_name;
        form.university_name = state.course.university_name;
        form.course_name = state.course.country_name;
        form.tuition_fee = state.course.tuition_fee;
        
        
    } catch (error) {
        console.error('update error')
    } finally {
        state.isloading = false
    }
})
</script>
<template>
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
                    <input type="text" placeholder="University Name" name="University Name"
                        v-model="form.university_name" class="input w-full input-bordered" />
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
                    <input type="number" placeholder="Tuition Fee" name="Tuition Fee" v-model="form.tuition_fee"
                        class="input w-full input-bordered" />
                </div>
            </div>
            <input type="submit" value="Edit Course" class="btn btn-block text-white bg-purple-400" />
        </form>
    </div>
</template>