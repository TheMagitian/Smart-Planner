#[allow(dead_code)]

use rand::prelude::*;

#[derive(Debug)]
#[derive(PartialEq)]
enum ActivityType {
	College,
	Personal,
	Family,
	Misc,
}

struct CompTime(u8, u8, u8, u8, u8, u8);

struct Activity {
	name: String,
	typ: ActivityType,
	diff: f32,
	score: f32,
	toc: CompTime,
	deadline: CompTime,
}

impl ActivityType {
	fn priority(&self) -> i8 {
		match self {
			ActivityType::College => 40,
			ActivityType::Personal => 30,
			ActivityType::Family => 20,
			ActivityType::Misc => 10,
		}
	}
}

	// "Difficulty: 0..1. 1 - easy, 0 - impossible";
impl Activity {
	
    fn sigmoid(x: f32) -> f32 {
        1.0 / (1.0 + (-x).exp())
    }

    fn get_score(&mut self) {
        let diff_weight = 0.7; // Increase the weight for difficulty
        let priority_weight = 0.3; // Decrease the weight for priority
        let linear_score = (self.diff * diff_weight) - ((self.typ.priority() as f32).powi(2) * priority_weight);
        let score = Self::sigmoid(linear_score);
        let mut rng = rand::thread_rng();
        let random_component: f32 = rng.gen::<f32>();
        let modified_score = score + random_component;
        let normalized_score = modified_score * 100.0; // Assuming the range is [0, 100]

        self.score = normalized_score;
    }
	fn new() -> Activity {
		return Activity {
			name: String::from("ACT0"),
			typ: ActivityType::Personal,
			diff: 0.5,
			toc: CompTime(0, 0, 0, 0, 0, 0),
			deadline: CompTime(0, 0, 0, 0, 0, 0),
			score: 0.0,
		};
	}

}

fn main() {
	let mut a: Activity = Activity::new();
	let _ = a.get_score();
	println!("{:?} => {} | {}", a.name, a.diff, a.score as i32);
}
