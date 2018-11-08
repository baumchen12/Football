// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Profile = require('../models/Profile')
const Team = require('../models/Team')

///////          Profiles 

router.get('/profile', (req, res) => { 
	// const query = req.query
	let filters = req.query
	if (req.query.age != null){
		filters = {
			age: {$gt: req.query.age}
		}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success', 
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

// NON-RESTful

router.get('/profile/update', (req, res) => {
	const query = req.query // require: id, key=value
	const profileId = query.id
	delete query['id']
	
	Profile.findByIdAndUpdate(profileId, query, {new:true})
	.then(profiles => {
		res.json({
			confirmation: 'success', 
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})	
})

router.get('/profile/remove', (req, res) => {
	const query = req.query
	
	Profile.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success', 
			data: 'Profile '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})	
})

router.get('/profile/:id', (req,res) => {
	const id = req.params.id
	
	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success', 
			data: profile
		})
	})
	.catch(err => {
	res.json({
		confirmation: 'fail',
		message: 'Profile ' + id + ' not found.'
	})
})

router.post('/profile', (req, res) => {
	
	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


/////////       Teams


router.get('/team', (req, res) => { 
	// const query = req.query
	let filters = req.query
	if (req.query.team != null){
		filters = {
			team: {$gt: req.query.team}
		}
	}

	Team.find(filters)
	.then(team => {
		res.json({
			confirmation: 'success', 
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

// NON-RESTful

router.get('/team/update', (req, res) => {
	const query = req.query // require: id, key=value
	const teamId = query.id
	delete query['id']
	
	Team.findByIdAndUpdate(teamId, query, {new:true})
	.then(team => {
		res.json({
			confirmation: 'success', 
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})	
})

router.get('/team/remove', (req, res) => {
	const query = req.query
	
	Team.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success', 
			data: 'Team '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})	
})

router.get('/team/:id', (req,res) => {
	const id = req.params.id
	
	Team.findById(id)
	.then(team => {
		res.json({
			confirmation: 'success', 
			data: team
		})
	})
	.catch(err => {
	res.json({
		confirmation: 'fail',
		message: ' Team ' + id + ' not found. '
	})
})

router.post('/team', (req, res) => {
	
	Team.create(req.body)
	.then(team => {
		res.json({
			confirmation: 'success',
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

module.exports = router
