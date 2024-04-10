#[allow(dead_code)]

use rand::prelude::*;
use sha2::{Sha256, Digest};

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

    fn get_score(&mut self, seed: f32) {
        let mut sc: f32 = 100.0;
        let mut hasher = Sha256::new();
        
        // Use the activity's parameters to generate a seed for the hash function
        let seed_str = format!("{}{}{}{}{}{}", self.name, self.typ as u8, self.diff, self.toc.0, self.toc.1, self.toc.2);
        hasher.update(seed_str);
        let result = hasher.finalize();
        let r = f32::from_bits(result[0..4].try_into().unwrap()); // Convert the first 4 bytes of the hash to a f32

        match self.typ {
            ActivityType::College => sc *= 0.15,
            ActivityType::Personal => sc *= 0.10,
            ActivityType::Family   => sc *= 0.05,
            ActivityType::Misc     => sc *= 0.01,
        }
        sc *= 1.0/self.diff as f32; // score ∝ 1/diff
        sc += f32::powi(self.typ.priority() as f32, 2);
        sc -= ((r as u8) * (r as u8)) as f32 % sc as f32;
        println!("=== {} ===", r);
        println!("=== {} ===", sc);
        self.score = r*sc;
    }
}

fn main() {
	let mut a: Activity = Activity::new();
	let seed = rand::thread_rng().gen::<f32>();
	let _ = a.get_score(seed);
	println!("{:?} => {} | {}", a.name, a.diff, a.score);
}
